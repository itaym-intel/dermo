import os
import shutil

# Paths
train_folder = 'img/training'  # Replace with the path to your train folder
skin_folder = 'img/skin_of_color_testing'  # Replace with the path to your skin folder
test_folder = 'img/testing'    # Replace with the path to your test folder
combined_folder = 'img/combined'  # The folder where combined images will be placed

# Create the combined folder if it doesn't exist
os.makedirs(combined_folder, exist_ok=True)

# List all classes in train, test, and skin folders (assuming class subfolders in both)
train_classes = os.listdir(train_folder)
test_classes = os.listdir(test_folder)
skin_classes = os.listdir(skin_folder)

# Merge the classes from both folders
for folder, class_list in [(train_folder, train_classes), (test_folder, test_classes), (skin_folder, skin_classes)]:
    for class_name in class_list:
        class_path = os.path.join(folder, class_name)
        if os.path.isdir(class_path):  # Ensure it's a directory
            combined_class_folder = os.path.join(combined_folder, class_name)
            os.makedirs(combined_class_folder, exist_ok=True)

            # Move images from the current folder to the combined folder
            for image in os.listdir(class_path):
                image_path = os.path.join(class_path, image)
                if os.path.isfile(image_path):  # Only move files
                    shutil.move(image_path, os.path.join(combined_class_folder, image))

print("Train, test, and skin_of_color_testing folders have been merged successfully.")

# Path to the combined folder
combined_folder = 'img/combined'  # Replace with your combined folder path

# Loop through each class folder in the combined folder
for class_name in os.listdir(combined_folder):
    class_folder = os.path.join(combined_folder, class_name)
    
    # Ensure the path is a directory
    if os.path.isdir(class_folder):
        
        # Loop through all files in the class folder
        for file_name in os.listdir(class_folder):
            file_path = os.path.join(class_folder, file_name)
            
            # Check if it's a file (not a directory) and it's not an image file (not ending with '.jpg')
            if os.path.isfile(file_path) and not file_name.lower().endswith('.jpg'):
                print(f"Deleting non-image file: {file_path}")  # Optionally print the file being deleted
                os.remove(file_path)  # Delete the non-image file

print("All non-image files have been deleted.")
