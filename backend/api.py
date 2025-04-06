from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import torch
from PIL import Image
import io
import os
from torchvision import transforms
from mole_model.evaluate_model import ISICModel
from skin_diagnosis.model import ViTClassifier, vi_processor
from groq import get_medical_advice
import torch.nn.functional as F

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://dermoai.com"],  # Explicitly allow your frontend domain
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

# Set up device
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# Define transformations
transform = transforms.Compose([
    transforms.Resize((256, 256)),
    transforms.ToTensor(),
    transforms.Normalize(
        mean=[0.4815, 0.4578, 0.4082],
        std=[0.2686, 0.2613, 0.2758]
    )
])

# Load the model
current_dir = os.path.dirname(os.path.abspath(__file__))
model_path = os.path.join(current_dir, 'mole_model', 'final_isic_model.pt')
model = ISICModel('edgenext_base.in21k_ft_in1k', num_classes=1, pretrained=False)
model.load_state_dict(torch.load(model_path, map_location=device))
model = model.to(device)
model.eval()

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    # Read the image file
    contents = await file.read()
    image = Image.open(io.BytesIO(contents)).convert('RGB')
    
    # Apply transformations
    image_tensor = transform(image).unsqueeze(0).to(device)
    
    # Make prediction
    with torch.no_grad():
        outputs = model(image_tensor)
        probability = torch.sigmoid(outputs).cpu().numpy()[0][0]
    
    # Create prediction dictionary
    predictions = {
        'ailment': 'Cancer' if probability > 0.5 else 'Benign',
        'positive': float(probability),
        'recommendations': [
            'Please consult a dermatologist for a professional evaluation.',
            'Regular monitoring of skin changes is recommended.',
            'Keep track of any changes in size, shape, or color.'
        ] if probability > 0.5 else [
            'Continue regular skin monitoring.',
            'Use sun protection and practice skin safety.',
            'Schedule routine skin check-ups with your healthcare provider.'
        ]
    }
    
    return predictions

# Path to your best_model.pth from training
skin_diagnosis_weights_path = os.path.join(current_dir, 'skin_diagnosis', 'best_model.pth')

# Example class_to_idx from training (adjust to your real classes):
class_to_idx = {
    'Acne': 0,
    'Actinic_Keratosis': 1,
    'Benign_tumors': 2,
    'Bullous': 3,
    'Candidiasis': 4,
    'DrugEruption': 5,
    'Eczema': 6,
    'Infestations_Bites': 7,
    'Lichen': 8,
    'Lupus': 9,
    'Moles': 10,
    'Psoriasis': 11,
    'Rosacea': 12,
    'Seborrh_Keratoses': 13,
    'SkinCancer': 14,
    'Sun_Sunlight_Damage': 15,
    'Tinea': 16,
    'Unknown_Normal': 17,
    'Vascular_Tumors': 18,
    'Vasculitis': 19,
    'Vitiligo': 20,
    'Warts': 21
}
idx_to_class = {v: k for k, v in class_to_idx.items()}
NUM_CLASSES = len(class_to_idx)

# Instantiate the classifier
skin_diagnosis_model = ViTClassifier(NUM_CLASSES)
skin_diagnosis_model.load_state_dict(
    torch.load(skin_diagnosis_weights_path, map_location=device),
    strict=False
)
skin_diagnosis_model = skin_diagnosis_model.to(device)
skin_diagnosis_model.eval()


@app.post("/diagnose_skin")
async def predict(file: UploadFile = File(...)):
    # Read the image file
    contents = await file.read()
    image = Image.open(io.BytesIO(contents)).convert('RGB')

    # Preprocess with vi_processor for multi-class
    pixel_values = vi_processor(image, return_tensors="pt")["pixel_values"]

    # Make prediction
    with torch.no_grad():
        outputs = skin_diagnosis_model(pixel_values.to(device))
        probs = F.softmax(outputs, dim=1)
        pred_idx = probs.argmax(dim=1).item()
        confidence = probs[0, pred_idx].item()

    # Get predicted class index
    pred_idx = outputs.argmax(dim=1).item()
    pred_class = idx_to_class[pred_idx]

    # For example, get advice from an LLM or a local map
    response = get_medical_advice(pred_class)

    # Return as a dict (JSON)
    return {
      "prediction": pred_class,
      "advice": response,
      "confidence": confidence
    }


@app.get("/")
async def root():
    return {"message": "Mole Evaluation API is running"} 