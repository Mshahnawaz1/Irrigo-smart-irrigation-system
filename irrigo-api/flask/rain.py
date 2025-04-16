import pickle
import pandas as pd

# Load the model from the uploaded file
with open("soil-rain-pred.pkl", "rb") as f:
    model = pickle.load(f)

# Input data
data = {
    "soil moisture": 70,
    "humidity": 55,
    "temperature": 22.0,
    "predicted_rainfall": 10
}

# Convert data to DataFrame for prediction
newdata = pd.DataFrame({
    "soil_moisture": [data["soil moisture"]],
    "humidity": [data["humidity"]],
    "temperature": [data["temperature"]],
    "predicted_rainfall": [data["predicted_rainfall"]]
})

# Make prediction
y = model.predict(newdata)

# Show output
print(f"Predicted output: {y[0]}")
