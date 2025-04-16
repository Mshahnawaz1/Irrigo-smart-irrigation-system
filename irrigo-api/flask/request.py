import requests

# URL of the Flask API
url = "http://127.0.0.1:5000/data"
backendurl = "http://localhost:3000/data"

response = requests.get(backendurl)
if response.status_code == 200:
    data = response.json()
    # print(data)
    temperature = data.get('temperature')
    humidity = data.get('humidity')
    soil_moisture = data.get('soilmoisture')
else:
    print(f"Failed to fetch data. Status code: {response.status_code}")


# JSON data to send
data = {
    "soil moisture": soil_moisture,
    "humidity": humidity,
    "temperature": temperature
}

# Send POST request
response = requests.post(url, json=data)

# Print the response
print("Status Code:", response.status_code)
print("Response JSON:", response.json())



# Send POST request

url = "http://localhost:3000/control"  # Replace with your actual API URL

# Data to be sent in JSON format
data = {
    "pump_status": response.json()
}

# Sending the POST request
receive = requests.post(url, json=data)

# Printing the response from the server
print("Status Code:", receive.status_code)
print("Response:", receive.json())
