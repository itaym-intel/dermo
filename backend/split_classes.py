import os
import shutil
from sklearn.model_selection import train_test_split
import gc  # For garbage collection

dataset_dir = 'data/classes'
output_dir = 'data/split_classes'
split_ratio = 0.8  # 80% train, 20% test
batch_size = 100   # Number of images to process per batch (adjustable)

os.makedirs(output_dir, exist_ok=True)
train_dir = os.path.join(output_dir, 'train')
test_dir = os.path.join(output_dir, 'test')

already_processed_before_error = set(os.listdir(train_dir)).intersection(os.listdir(test_dir))
# Check if the train/test directories already exist and have been processed before

for category in os.listdir(dataset_dir):
    if category in already_processed_before_error:
        print(f"Skipping already processed category '{category}'...")
        continue
    category_path = os.path.join(dataset_dir, category)
    images = [img for img in os.listdir(category_path) if img.lower().endswith(('.jpg', '.jpeg', '.png'))]

    if len(images) == 0:
        print(f"Warning: No images found in category '{category}'. Skipping...")
        continue

    # Split into train/test
    train_imgs, test_imgs = train_test_split(images, train_size=split_ratio, random_state=42)

    # Create directories
    train_category_path = os.path.join(train_dir, category)
    test_category_path = os.path.join(test_dir, category)
    os.makedirs(train_category_path, exist_ok=True)
    os.makedirs(test_category_path, exist_ok=True)

    def copy_in_batches(image_list, source_path, target_path):
        total_images = len(image_list)
        for i in range(0, total_images, batch_size):
            batch = image_list[i:i + batch_size]
            for img in batch:
                src_img = os.path.join(source_path, img)
                dest_img = os.path.join(target_path, img)
                shutil.copy2(src_img, dest_img)
            print(f"Copied batch {i//batch_size + 1}/{(total_images - 1)//batch_size + 1} for '{category}' to '{target_path}'")
            # Clear memory and cache
            gc.collect()

    # Copy images in batches for train and test sets
    copy_in_batches(train_imgs, category_path, train_category_path)
    copy_in_batches(test_imgs, category_path, test_category_path)

    print(f'Finished category "{category}": {len(train_imgs)} train images, {len(test_imgs)} test images\n')
