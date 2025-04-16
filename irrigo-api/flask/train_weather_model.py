import pandas as pd
import numpy as np
import pickle
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

# Load dataset
df = pd.read_csv("weather_dataset.csv")  # Ensure your dataset has the required features

# Define features and target variable
X = df[["Temperature", "Humidity", "Wind Speed", "Pressure", "Cloud Cover"]]
y = df["Rain"]  # 1 for rain, 0 for no rain

# Split data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train the model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Test model accuracy
y_pred = model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)
print(f"Model Accuracy: {accuracy * 100:.2f}%")

# Save the trained model
with open("weather_model.pkl", "wb") as f:
    pickle.dump(model, f)
