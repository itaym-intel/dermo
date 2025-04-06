import os
import shutil
import gc
from pathlib import Path
from random import random

CLASSIFICATION_HIERARCHY = {
    "Pigmented_Lesions": {
        "Melanocytic_Nevi_Moles": [
            "Melanocytic Nevi", 
            "Melanocytic nevus",
            "Moles",
            "moles_and_health_skin"  # Assuming this contains normal moles
        ],
        "Melanoma": ["Melanoma"],
        "Seborrheic_Keratoses": [
            "Seborrheic Keratoses",
            "Benign Keratosis-like Lesions"  # Clinically similar
        ],
        "Actinic_Keratosis": ["Actinic keratosis"],
        "Lentigo": ["lentigo"]
    },
    "Inflammatory_Red_Patches": {
        "Psoriasis": [
            "Psoriasis",
            "7. Psoriasis pictures Lichen Planus and related diseases - 2k"  # Contains psoriasis
        ],
        "Eczema_Dermatitis": [
            "Eczema",
            "Atopic Dermatitis",  # Atopic dermatitis is a type of eczema
            "contact dermatitis"
        ],
        "Pityriasis_Rosea": ["pityriasis rosea"],
        "Erythema_Disorders": [
            "Erythema marginatum",
            "superficial erythema annulare centrifugum"
        ],
        "Photodermatoses": [
            "phototoxic-reactions",
            "sunburn"
        ]
    },
    "Infectious_Lesions": {
        "Fungal_Infections": [
            "Tinea",
            "9. Tinea Ringworm Candidiasis and other Fungal Infections - 1.7k",
            "tinea corporis"  # Specific type of tinea
        ],
        "Viral_Infections": [
            "Warts",
            "10. Warts Molluscum and other Viral Infections - 2103",
            "shingles"
        ],
        "Candidiasis": ["Candidiasis"],
        "Bacterial_Infections": [
            "Bacterial cellulitis",
            "erythema migrans"  # Lyme disease (bacterial)
        ]
    },
    "Vascular_Lesions": {
        "Vascular_Tumors": [
            "Vascular lesion",
            "Vascular_Tumors"
        ],
        "Vasculitis": ["Vasculitis"],
        "Urticaria": ["Urticartia"]  # Fixed typo in original
    },
    "Bullous_Blistering": {
        "Bullous_Disorders": ["Bullous"],
        "Drug_Reactions": ["drug"]  # When causing blistering
    },
    "Bite_Infestation_Reactions": {
        "Arthropod_Bites": ["bite"],
        "Infestations": ["Infestations_Bites"]
    },
    "Tumor-like_Growths": {
        "Basal_Cell_Carcinoma": ["Basal Cell Carcinoma"],
        "Squamous_Cell_Carcinoma": ["Squamous cell carcinoma"],
        "Benign_Tumors": [
            "Benign_tumors",
            "Dermatofibroma",  # Specific benign tumor
            "8. Seborrheic Keratoses and other Benign Tumors - 1.8k",
            "actinic-granuloma"
        ]
    },
    "Depigmentation_Disorders": {
        "Vitiligo": ["Vitiligo"],
        "Lichen_Planus": [
            "Lichen",
            "7. Psoriasis pictures Lichen Planus and related diseases - 2k"  # Contains lichen planus
        ],
        "Lupus": ["Lupus"]
    },
    "Other": {
        "Normal_Skin": ["Unknown_Normal"],
        "Actinic_Damage": [
            "sun-damaged-skin",
            "actinic-comedones"
        ]
    }
}

def organize_dataset(input_root, output_root, train_ratio=0.8, batch_size=1000):
    """
    Organize the dermatology dataset into optimized hierarchical structure with train/test split.
    
    Args:
        input_root (str): Path to current dataset
        output_root (str): Path where organized dataset will be created
        train_ratio (float): Proportion of images for training (default: 0.8)
        batch_size (int): Number of files to process before garbage collection
    """
    input_root = Path(input_root)
    output_root = Path(output_root)
    
    # Create train and test directories
    train_root = output_root / "train"
    test_root = output_root / "test"
    
    # Create directory structure for both train and test
    for macro_class, micro_classes in CLASSIFICATION_HIERARCHY.items():
        for split_root in [train_root, test_root]:
            macro_dir = split_root / macro_class
            macro_dir.mkdir(parents=True, exist_ok=True)
            
            for micro_class in micro_classes.keys():
                micro_dir = macro_dir / micro_class
                micro_dir.mkdir(parents=True, exist_ok=True)
    
    # Map each source directory to its target path (macro/micro)
    source_to_target = {}
    for macro_class, micro_classes in CLASSIFICATION_HIERARCHY.items():
        for micro_class, source_dirs in micro_classes.items():
            for source_dir in source_dirs:
                source_to_target[source_dir] = (macro_class, micro_class)
    
    # Process files in batches with garbage collection
    processed_files = 0
    batch_count = 0
    
    for item in input_root.iterdir():
        if item.is_dir():
            dir_name = item.name
            if dir_name in source_to_target:
                macro_class, micro_class = source_to_target[dir_name]
                
                # Get all files in the source directory
                files = list(item.iterdir())
                total_files = len(files)
                
                print(f"\nProcessing {dir_name} ({total_files} files)...")
                
                # Process files in batches
                for i, file in enumerate(files):
                    if file.is_file():
                        # Determine train or test split
                        split = "train" if random() < train_ratio else "test"
                        dest_dir = output_root / split / macro_class / micro_class
                        
                        # Copy the file
                        shutil.copy2(file, dest_dir / file.name)
                        processed_files += 1
                        
                        # Print progress every 100 files
                        if (i + 1) % 100 == 0 or (i + 1) == total_files:
                            print(f"  Processed {i+1}/{total_files} files", end='\r')
                        
                        # Garbage collection and progress reporting
                        if processed_files % batch_size == 0:
                            gc.collect()
                            batch_count += 1
                            print(f"\nBatch {batch_count} completed ({processed_files} total files processed)")
                
                print(f"\nFinished processing {dir_name}")
    
    print(f"\nDataset organization complete! Total files processed: {processed_files}")
    print(f"Train/test split ratio: {train_ratio*100:.0f}%/{100-train_ratio*100:.0f}%")

if __name__ == "__main__":
    # Configuration
    input_directory = "data/notdermnet"  # Update this
    output_directory = "data/segmented_classes"    # Update this
    train_ratio = 0.8  # 80% train, 20% test
    batch_size = 2000  # Number of files to process before GC
    
    # Run the organization
    organize_dataset(
        input_directory, 
        output_directory,
        train_ratio=train_ratio,
        batch_size=batch_size
    )