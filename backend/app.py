from flask import Flask, request, jsonify, send_from_directory
import numpy as np
from PIL import Image
import tensorflow as tf
import os
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required
from werkzeug.utils import secure_filename

# Initialize Flask App
app = Flask(__name__)
CORS(app, supports_credentials=True, resources={r"/*": {"origins": "http://localhost:3000"}})

# Database & Security Config
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///users.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["JWT_SECRET_KEY"] = "your_secret_key"
app.config["PROPAGATE_EXCEPTIONS"] = True

# Initialize Extensions
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

# User Model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)

# Create Tables
with app.app_context():
    db.create_all()

# Signup Route
@app.route("/signup", methods=["POST"])
def signup():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "Invalid JSON data"}), 400

        full_name = data.get("fullName")
        email = data.get("email")
        password = data.get("password")

        if not full_name or not email or not password:
            return jsonify({"error": "All fields are required"}), 400

        if User.query.filter_by(email=email).first():
            return jsonify({"error": "Email already registered"}), 400

        hashed_password = bcrypt.generate_password_hash(password).decode("utf-8")
        new_user = User(full_name=full_name, email=email, password=hashed_password)

        db.session.add(new_user)
        db.session.commit()

        return jsonify({"message": "User registered successfully"}), 201

    except Exception as e:
        print("Signup Error:", str(e))  # Debugging
        return jsonify({"error": "Internal Server Error"}), 500

# Login Route
@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    user = User.query.filter_by(email=email).first()
    if user and bcrypt.check_password_hash(user.password, password):
        access_token = create_access_token(identity=user.email)
        return jsonify({
            "token": access_token,
            "user": {
                "id": user.id,
                "full_name": user.full_name,
                "email": user.email,
                "role": "User"
            }
        })
    
    return jsonify({"error": "Invalid email or password"}), 401

# Load Model
MODEL_PATH = "model/cotton_disease_model.h5"
model = tf.keras.models.load_model(MODEL_PATH)

# Class Labels
class_labels = ["Bacterial Blight", "Curl Virus", "Fusarium Wilt", "Healthy"]

# File Upload Config
UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg"}

def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS

# Image Preprocessing
def preprocess_image(image_path):
    img = Image.open(image_path).resize((256, 256))  
    img = np.array(img) / 255.0  
    img = np.expand_dims(img, axis=0)  
    return img

# Protected Predict Route
@app.route("/predict", methods=["POST"])
@jwt_required()
def predict():
    if "file" not in request.files:
        return jsonify({"error": "No file provided"}), 400

    file = request.files["file"]

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file_path = os.path.join(UPLOAD_FOLDER, filename)
        file.save(file_path)
        
        img = preprocess_image(file_path)
        predictions = model.predict(img)
        class_index = np.argmax(predictions)
        result = class_labels[class_index]

        return jsonify({"prediction": result})
    
    return jsonify({"error": "Invalid file type"}), 400

# Serve Static Files
@app.route("/static/dataset/<path:filename>")
def serve_dataset(filename):
    return send_from_directory("dataset", filename)

if __name__ == "__main__":
    app.run(debug=True)