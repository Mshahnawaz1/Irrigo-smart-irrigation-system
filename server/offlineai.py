import pandas as pd
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense
import tensorflow.lite as tflite

# Load dataset (Ensure it has Soil Moisture, Temp, Humidity, and Irrigation Decision)
df = pd.read_csv("sensor_dataset.csv")

# Define input (X) and output (y)
X = df[["soil_moisture", "temperature", "humidity"]]
y = df["irrigation_needed"]  # 1 = Yes, 0 = No

# Define AI Model
model = Sequential([
    Dense(16, activation="relu", input_shape=(3,)),
    Dense(8, activation="relu"),
    Dense(1, activation="sigmoid")  # Output: 0 or 1
])

# Compile and train the model
model.compile(optimizer="adam", loss="binary_crossentropy", metrics=["accuracy"])
model.fit(X, y, epochs=100, batch_size=8, verbose=1)

# Convert to TensorFlow Lite
converter = tflite.TFLiteConverter.from_keras_model(model)
tflite_model = converter.convert()

# Save Model
with open("model.tflite", "wb") as f:
    f.write(tflite_model)

print("Model saved as model.tflite")
