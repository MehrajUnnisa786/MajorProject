from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS  
import os
import numpy as np
import tensorflow as tf
from werkzeug.utils import secure_filename
from PIL import Image

app = Flask(__name__)
CORS(app)  

MODEL_PATH = "model/cotton_disease_model.h5"
model = tf.keras.models.load_model(MODEL_PATH)

class_labels = ["Bacterial Blight", "Curl Virus", "Fusarium Wilt", "Healthy"]

def preprocess_image(image_path):
    img = Image.open(image_path).resize((256, 256))  
    img = np.array(img) / 255.0  
    img = np.expand_dims(img, axis=0) 
    return img

@app.route("/static/dataset/<path:filename>")
def serve_dataset(filename):
    return send_from_directory("dataset", filename)

@app.route("/predict", methods=["POST"])
def predict():
    if "file" not in request.files:
        return jsonify({"error": "No file provided"}), 400

    file = request.files["file"]
    filename = secure_filename(file.filename)
    
    upload_folder = "uploads"
    os.makedirs(upload_folder, exist_ok=True)
    
    file_path = os.path.join(upload_folder, filename)
    file.save(file_path)
    
    img = preprocess_image(file_path)
    predictions = model.predict(img)
    class_index = np.argmax(predictions)
    result = class_labels[class_index]

    return jsonify({"prediction": result})

if __name__ == "__main__":
    app.run(debug=True)