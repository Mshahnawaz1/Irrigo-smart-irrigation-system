from flask import Flask, request, render_template, jsonify
import pickle

app = Flask(__name__)


# Load the model
# with open("irrigation_model.pkl", "rb") as f:
#     loaded_model = pickle.load(f)

@app.route('/')
def index():
    return render_template('/index.html')

@app.route('/data', methods=['POST'])
def receive_data():
    data = request.json  # Get JSON data from React
    print("Received data:", data)
    return jsonify({"message": "Data received successfully!", "data": data})


@app.route("/predict", methods=["POST"])
def predict():
    # Get input data from the request
    data = request.json
    newdata = ({
    "Soil Moisture (%)" : data['temperatue'],
    "Humidity (%)" : data['humidity'] , 
    "Temperature (°C)": data['soilmoisture']
    })
    # x = model.predict(newdata)
    # Return the prediction
    return jsonify({"pump is": 1})

if __name__ == '__main__':
    app.run(debug=True)
