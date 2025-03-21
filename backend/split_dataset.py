import os
import shutil
import random

dataset_path = "cotton-disease-detection/backend/cotton"  
train_path = "cotton-disease-detection/backend/dataset/train"
test_path = "cotton-disease-detection/backend/dataset/test"

for folder in [train_path, test_path]:
    os.makedirs(folder, exist_ok=True)

split_ratio = 0.8  

for category in os.listdir(dataset_path):  
    category_path = os.path.join(dataset_path, category)

    if not os.path.isdir(category_path):
        continue

    images = [f for f in os.listdir(category_path) if os.path.isfile(os.path.join(category_path, f))]
    
    random.shuffle(images)
    
    split_idx = int(len(images) * split_ratio)
    train_images = images[:split_idx]
    test_images = images[split_idx:]
    
    os.makedirs(os.path.join(train_path, category), exist_ok=True)
    os.makedirs(os.path.join(test_path, category), exist_ok=True)

    for img in train_images:
        shutil.move(os.path.join(category_path, img), os.path.join(train_path, category, img))
    
    for img in test_images:
        shutil.move(os.path.join(category_path, img), os.path.join(test_path, category, img))

print("Dataset successfully split into Train and Test sets!")
