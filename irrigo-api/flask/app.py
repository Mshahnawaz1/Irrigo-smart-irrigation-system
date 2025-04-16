from flask import Flask, request, jsonify
import pandas as pd
import pickle
import requests
import threading
import time

from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load the ML model
with open("irrigation_model.pkl", "rb") as f:
    model = pickle.load(f)


with open("soil-rain-pred.pkl", "rb") as f:
    model_soil_rain = pickle.load(f)

# Backend URLs
BACKEND_URL = "http://localhost:3000/data"
CONTROL_URL = "http://localhost:3000/control"



# Function to fetch sensor data and control pump automatically
def fetch_and_control():
    while True:
        try:
            # Fetch data from Node.js
            response = requests.get(BACKEND_URL)
            if response.status_code == 200:
                sensor_data = response.json()
                print("Fetched Data:", sensor_data)

                # Ensure data exists if data['temperature'] and data['humidity'] and data['soilmoisture']:
                # else:
                #     print("Incomplete sensor data.")
                
                    # Prepare data for prediction
                new_data = pd.DataFrame({
                        "Soil Moisture (%)": [sensor_data['soilmoisture']],
                        "Humidity (%)": [sensor_data['humidity']],
                        "Temperature (°C)": [sensor_data['temperature']],
                    })

                    # Predict pump status
                prediction = model.predict(new_data)
                pump_status = int(prediction[0])
                print("Pump Status:", pump_status)

                    # Send pump status to Node.js

                # Predict water requirement
                if all(key in sensor_data for key in ["soilmoisture", "humidity", "temperature"]):
                    new_data_water = pd.DataFrame({
                        "soil_moisture": [sensor_data['soilmoisture']],
                        "humidity": [sensor_data['humidity']],
                        "temperature": [sensor_data['temperature']],
                        "predicted_rainfall": [20],
                    })

                # Predict water requirement
                    predicted_water = model_soil_rain.predict(new_data_water)
                    water_required = float(predicted_water[0])
                    print("Predicted Water Requirement:", water_required)

                    # Send water requirement to Node.js
                    # water_control_response = requests.post(CONTROL_URL, json={"water_required": water_required})
                    # print("Water Control Response:", water_control_response.json())
                control_payload = {
                        "pump_status": pump_status,
                        "water_required": water_required
                    }
                # control_response = requests.post(CONTROL_URL, json={"payload": control_payload})
                # print("pump Control Response:", control_response.json())
                try:
                    control_response = requests.post(CONTROL_URL, json=control_payload)
                    if control_response.status_code == 200:
                        print("Control Response:", control_response.json())
                    else:
                        print(f"Failed to send control data. Status Code: {control_response.status_code}")
                except requests.exceptions.RequestException as e:
                    print(f"Error sending control data: {e}")
                

            else:
                print(f"Failed to fetch data. Status Code: {response.status_code}")

        except Exception as e:
            print("Error:", str(e))

        # Wait 5 seconds before the next fetch (adjustable)
        time.sleep(5)

# Start the background task for automation
threading.Thread(target=fetch_and_control, daemon=True).start()

# Endpoint to handle incoming data
@app.route('/data', methods=['POST'])
def handle_data():
    try:
        data = request.json
        if not data:
            return jsonify({"error": "No data received"}), 400

        print("Received Data:", data)

        newdata = pd.DataFrame({
            "Soil Moisture (%)": [data['soil moisture']],
            "Humidity (%)": [data['humidity']],
            "Temperature (°C)": [data['temperature']],
        })

        prediction = model.predict(newdata)
        pump_status=int(prediction[0])
        print("Prediction:", prediction[0])
        
    
        # Predict water requirement
        predicted_water = model_soil_rain.predict(newdata)
        water_required = float(predicted_water[0])
        print("Predicted Water Requirement:", water_required)

        return jsonify({"pump_status": pump_status, "water_required": water_required}), 200

        # else:
        #     return jsonify({"error": "Incomplete data"}), 400

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)

