import os
import shutil
import random

# Define dataset paths
dataset_path = "cotton-disease-detection/backend/cotton"  # Original dataset
train_path = "cotton-disease-detection/backend/dataset/train"
test_path = "cotton-disease-detection/backend/dataset/test"

# Create train and test folders if they don't exist
for folder in [train_path, test_path]:
    os.makedirs(folder, exist_ok=True)

# Define train-test split ratio (80-20)
split_ratio = 0.8  

# Loop through each disease class
for category in os.listdir(dataset_path):  
    category_path = os.path.join(dataset_path, category)

    #Ensure it's a directory (skip files)
    if not os.path.isdir(category_path):
        continue

    #Get only image files (ignore hidden/system files)
    images = [f for f in os.listdir(category_path) if os.path.isfile(os.path.join(category_path, f))]
    
    #Shuffle images randomly
    random.shuffle(images)
    
    #Split into train (80%) and test (20%)
    split_idx = int(len(images) * split_ratio)
    train_images = images[:split_idx]
    test_images = images[split_idx:]
    
    #Create category folders in train and test
    os.makedirs(os.path.join(train_path, category), exist_ok=True)
    os.makedirs(os.path.join(test_path, category), exist_ok=True)

    #Move images to respective folders (use shutil.move to avoid duplication)
    for img in train_images:
        shutil.move(os.path.join(category_path, img), os.path.join(train_path, category, img))
    
    for img in test_images:
        shutil.move(os.path.join(category_path, img), os.path.join(test_path, category, img))

print("Dataset successfully split into Train and Test sets!")
