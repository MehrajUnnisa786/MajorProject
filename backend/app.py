from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
import os
import numpy as np
import tensorflow as tf
from werkzeug.utils import secure_filename
from PIL import Image

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load model
MODEL_PATH = "model/cotton_disease_model.h5"
model = tf.keras.models.load_model(MODEL_PATH)

# Class labels
class_labels = ["Bacterial Blight", "Curl Virus", "Fussarium Wilt", "Healthy"]

# Function to preprocess image
def preprocess_image(image_path):
    img = Image.open(image_path).resize((224, 224))  # Resize to model input
    img = np.array(img) / 255.0  # Normalize
    img = np.expand_dims(img, axis=0)  # Add batch dimension
    return img

# Route for prediction
@app.route("/predict", methods=["POST"])
def predict():
    if "file" not in request.files:
        return jsonify({"error": "No file provided"}), 400

    file = request.files["file"]
    filename = secure_filename(file.filename)
    
    # Ensure the uploads directory exists
    upload_folder = "uploads"
    os.makedirs(upload_folder, exist_ok=True)
    
    file_path = os.path.join(upload_folder, filename)
    file.save(file_path)

    # Preprocess and predict
    img = preprocess_image(file_path)
    predictions = model.predict(img)
    class_index = np.argmax(predictions)
    result = class_labels[class_index]

    return jsonify({"prediction": result})

if __name__ == "__main__":
    app.run(debug=True)
