import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Conv2D, MaxPooling2D, Flatten, Dense, Dropout
from tensorflow.keras.preprocessing.image import ImageDataGenerator
import os

# Define paths
train_dir = "dataset/train"
test_dir = "dataset/test"
model_dir = "model"

# Ensure the model directory exists
if not os.path.exists(model_dir):
    os.makedirs(model_dir)

# Data Preprocessing
train_datagen = ImageDataGenerator(rescale=1.0 / 255, rotation_range=30, zoom_range=0.2, horizontal_flip=True)
test_datagen = ImageDataGenerator(rescale=1.0 / 255)

test_datagen = ImageDataGenerator(rescale=1.0 / 255)

train_generator = train_datagen.flow_from_directory(
    train_dir, target_size=(256, 256), batch_size=32, class_mode="categorical"
)
test_generator = test_datagen.flow_from_directory(
    test_dir, target_size=(256, 256), batch_size=32, class_mode="categorical"
)

# Build Model
model = Sequential([
    Conv2D(32, (3, 3), activation="relu", padding="same", input_shape=(256, 256, 3)),
    MaxPooling2D(pool_size=(2, 2)),  # (128, 128, 32)

    Conv2D(64, (3, 3), activation="relu", padding="same"),
    MaxPooling2D(pool_size=(2, 2)),  # (64, 64, 64)

    Conv2D(128, (3, 3), activation="relu", padding="same"),
    MaxPooling2D(pool_size=(2, 2)),  # (32, 32, 128)

    Flatten(),  # 32*32*128 = 131072 neurons

    Dense(128, activation="relu"),
    Dropout(0.5),

    Dense(4, activation="softmax")  # 4 classes: Bacterial Blight, Curl Virus, Fusarium Wilt, Healthy
])

# Compile Model
model.compile(optimizer="adam", loss="categorical_crossentropy", metrics=["accuracy"])

# Train Model
model.fit(train_generator, validation_data=test_generator, epochs=20)

# Evaluate Model
test_loss, test_accuracy = model.evaluate(test_generator)
print(f"Test Accuracy: {test_accuracy * 100:.2f}%")

# Save Model
model.save(os.path.join(model_dir, "cotton_disease_model.h5"))