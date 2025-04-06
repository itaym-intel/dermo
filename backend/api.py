from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import torch
import numpy as np
from PIL import Image
import io
import os
from torchvision import transforms
import timm
from mole_model.evaluate_model import ISICModel

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
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

@app.get("/")
async def root():
    return {"message": "Mole Evaluation API is running"} 