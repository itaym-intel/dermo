import torch.nn as nn
from transformers import ViTImageProcessor, ViTModel
class ViTClassifier(nn.Module):
    def __init__(self, num_classes):
        super(ViTClassifier, self).__init__()
        self.vit = ViTModel.from_pretrained('google/vit-base-patch16-224-in21k')
        self.classifier = nn.Linear(self.vit.config.hidden_size, num_classes)

    def forward(self, pixel_values):
        outputs = self.vit(pixel_values=pixel_values)
        return self.classifier(outputs.pooler_output)

vi_processor = ViTImageProcessor.from_pretrained('google/vit-base-patch16-224-in21k')
