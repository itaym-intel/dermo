import os
import torch
import numpy as np
from tqdm import tqdm
import h5py
from PIL import Image
from io import BytesIO
from torchvision import transforms
import timm
import argparse
from sklearn.metrics import roc_auc_score, accuracy_score, precision_score, recall_score, f1_score

if __name__ == '__main__':
    # Set multiprocessing method to spawn for Windows
    if os.name == 'nt':
        import multiprocessing
        multiprocessing.freeze_support()

class ISICModel(torch.nn.Module):
    def __init__(self, model_name, num_classes=1, pretrained=True, checkpoint_path=None, *args, **kwargs):
        super(ISICModel, self).__init__()
        self.model = timm.create_model(
            model_name, 
            pretrained=pretrained, 
            num_classes=num_classes, 
            global_pool='avg'
        )
        
    def forward(self, x):
        return self.model(x)


def predict_single_image(model, image_path, device, transform):
    """
    Predict on a single image
    Args:
        model: The loaded model
        image_path: Path to the image file
        device: Device to run inference on
        transform: Image transformations to apply
    Returns:
        Dictionary with class probabilities
    """
    # Load and preprocess image
    image = Image.open(image_path).convert('RGB')
    
    # Apply transformations
    image_tensor = transform(image).unsqueeze(0).to(device)
    
    # Make prediction
    model.eval()
    with torch.no_grad():
        outputs = model(image_tensor)
        probability = torch.sigmoid(outputs).cpu().numpy()[0][0]
    
    # Create prediction dictionary
    predictions = {
        'Ailment': 'Cancer',
        'Positive': float(probability)
    }
    
    return predictions

def calculate_metrics(true_labels, predictions, threshold=0.5):
    """
    Calculate various performance metrics
    """
    # Convert logits to probabilities
    probabilities = 1 / (1 + np.exp(-predictions))
    
    # Convert probabilities to binary predictions using threshold
    binary_preds = (probabilities >= threshold).astype(int)
    
    # Calculate metrics
    accuracy = accuracy_score(true_labels, binary_preds)
    precision = precision_score(true_labels, binary_preds)
    recall = recall_score(true_labels, binary_preds)
    f1 = f1_score(true_labels, binary_preds)
    auc = roc_auc_score(true_labels, probabilities)
    
    return {
        'accuracy': accuracy,
        'precision': precision,
        'recall': recall,
        'f1_score': f1,
        'auc_roc': auc
    }

def main():
    parser = argparse.ArgumentParser(description='Predict skin lesion type')
    parser.add_argument('--image', type=str, help='Path to single image for prediction')

    args = parser.parse_args()

    # Set up device
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    print(f"Using device: {device}")

    # Define transformations
    transform = transforms.Compose([
        transforms.Resize((256, 256)),
        transforms.ToTensor(),
        transforms.Normalize(
            mean=[0.4815, 0.4578, 0.4082],
            std=[0.2686, 0.2613, 0.2758]
        )
    ])

    # Load the saved model
    print("Loading the saved model...")
    model = ISICModel('edgenext_base.in21k_ft_in1k', num_classes=1, pretrained=False)
    model.load_state_dict(torch.load('final_isic_model.pt'))
    model = model.to(device)
    model.eval()

    if args.image:
        # Predict on single image
        print(f"\nPredicting on image: {args.image}")
        predictions = predict_single_image(model, args.image, device, transform)
        
        print("\nPrediction Results:")
        print("-" * 50)
        for class_name, probability in predictions.items():
            print(f"{class_name}: {probability:.4f}")
        print("-" * 50)
    
    else:
        print("Please specify --image for single image prediction")

if __name__ == "__main__":
    main() 