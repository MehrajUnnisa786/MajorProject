import os
from PIL import Image
import numpy as np

def load_and_preprocess_image(image_path, target_size=(224, 224)):
    """ Loads and preprocesses an image for model inference """
    image = Image.open(image_path)
    image = image.resize(target_size)
    image = np.array(image) / 255.0  
    image = np.expand_dims(image, axis=0)  
    return image
