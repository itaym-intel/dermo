import torch
import torch.nn as nn
from torchvision.datasets import ImageFolder
from torch.utils.data import DataLoader
from transformers import ViTImageProcessor, ViTModel
from sklearn.metrics import classification_report, accuracy_score
from tqdm import tqdm
import torch.backends.cudnn as cudnn
from transformers import get_linear_schedule_with_warmup
from functools import partial

def collate_fn(batch, processor):
    images, labels = zip(*batch)
    pixel_values = processor(images, return_tensors="pt")["pixel_values"]
    labels = torch.tensor(labels)
    return pixel_values, labels



def main():
    # Enable cuDNN benchmark if input sizes are fixed
    cudnn.benchmark = True

    MODEL_NAME = 'google/vit-base-patch16-224-in21k'
    DEVICE = 'cuda' if torch.cuda.is_available() else 'cpu'
    BATCH_SIZE = 32
    EPOCHS = 50
    LR = 2e-5

    processor = ViTImageProcessor.from_pretrained(MODEL_NAME)

    collate = partial(collate_fn, processor=processor)

    train_dataset = ImageFolder('data/SkinDisease/train')
    test_dataset = ImageFolder('data/SkinDisease/test')

    train_loader = DataLoader(
        train_dataset, 
        batch_size=BATCH_SIZE, 
        shuffle=True, 
        collate_fn=collate,
        pin_memory=True,   # optional for speed
        num_workers=4      # can be >0, but on Windows must guard with if __name__...
    )
    test_loader = DataLoader(
        test_dataset, 
        batch_size=BATCH_SIZE, 
        shuffle=False, 
        collate_fn=collate,
        pin_memory=True,
        num_workers=4
    )

    print(train_dataset.class_to_idx)

    class ViTClassifier(nn.Module):
        def __init__(self, num_classes):
            super(ViTClassifier, self).__init__()
            self.vit = ViTModel.from_pretrained(MODEL_NAME)
            self.classifier = nn.Linear(self.vit.config.hidden_size, num_classes)

        def forward(self, x):
            outputs = self.vit(pixel_values=x)
            return self.classifier(outputs.pooler_output)

    model = ViTClassifier(len(train_dataset.classes)).to(DEVICE)
    criterion = nn.CrossEntropyLoss()
    optimizer = torch.optim.AdamW(model.parameters(), lr=LR)

    # Optional LR scheduler
    num_training_steps = len(train_loader) * EPOCHS
    scheduler = get_linear_schedule_with_warmup(
        optimizer, 
        num_warmup_steps=int(0.1 * num_training_steps), 
        num_training_steps=num_training_steps
    )

    scaler = torch.amp.GradScaler('cuda')
    best_val_loss = 0.9405
    temperance = 2
    count = 0

    model.load_state_dict(torch.load('weights/best_model.pth', map_location=DEVICE), strict=False)

    for epoch in range(EPOCHS):
        print(f"\nEpoch {epoch+1}/{EPOCHS}")
        model.train()
        total_loss = 0
        train_loop = tqdm(train_loader, desc="Training", leave=False)

        for pixel_values, labels in train_loop:
            pixel_values, labels = pixel_values.to(DEVICE), labels.to(DEVICE)

            optimizer.zero_grad()
            with torch.amp.autocast("cuda"):
                outputs = model(pixel_values)
                loss = criterion(outputs, labels)

            scaler.scale(loss).backward()
            scaler.step(optimizer)
            scaler.update()
            scheduler.step()

            total_loss += loss.item()
            train_loop.set_postfix(loss=loss.item())

        avg_train_loss = total_loss / len(train_loader)
        print(f"Train Loss: {avg_train_loss:.4f}")

        # Validation
        model.eval()
        val_loss = 0
        val_loop = tqdm(test_loader, desc="Validating", leave=False)
        with torch.no_grad(), torch.amp.autocast("cuda"):
            for pixel_values, labels in val_loop:
                pixel_values, labels = pixel_values.to(DEVICE), labels.to(DEVICE)
                outputs = model(pixel_values)
                loss = criterion(outputs, labels)
                val_loss += loss.item()
                val_loop.set_postfix(loss=loss.item())

        avg_val_loss = val_loss / len(test_loader)
        print(f"Val Loss: {avg_val_loss:.4f}")

        # Save best model
        if avg_val_loss < best_val_loss:
            best_val_loss = avg_val_loss
            torch.save(model.state_dict(), 'weights/best_model.pth')
            print("Model Saved (best so far)")
            count = 0
        else:
            count += 1
            print(f"No improvement for {count} epochs.")
            if count >= temperance:
                print("Early stopping triggered.")
                break

    print("\nLoading best model for final evaluation...")
    model.load_state_dict(torch.load('weights/best_model.pth', map_location=DEVICE), strict=False)
    model.to(DEVICE)
    model.eval()

    all_preds, all_labels = [], []
    with torch.no_grad(), torch.amp.autocast("cuda"):
        for pixel_values, labels in tqdm(test_loader, desc="Testing", leave=False):
            pixel_values, labels = pixel_values.to(DEVICE), labels.to(DEVICE)
            outputs = model(pixel_values)
            preds = outputs.argmax(dim=1)
            all_preds.extend(preds.cpu().numpy())
            all_labels.extend(labels.cpu().numpy())

    acc = accuracy_score(all_labels, all_preds)
    print("Final Accuracy:", acc)
    print(classification_report(all_labels, all_preds, target_names=test_dataset.classes))

if __name__ == "__main__":
    # The required guard
    main()
