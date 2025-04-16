#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>
#include <DHT.h>  

// Replace with your Wi-Fi credentials
const char* ssid = "";
const char* password = "";


// Your Node.js server endpoint
const char* serverName = "http://192.168.3.106:3000/data"; // to uplaod sensor data
const char* controlServer = "http://192.168.3.106:3000/control"; // API to get 1 or 0

#define DHT_SENSOR_PIN 4
#define DHT_SENSOR_TYPE DHT11
#define Soil_moisture_pin 34

// Relay connected to GPIO 5
#define RELAY_PIN 5

DHT dht_sensor(DHT_SENSOR_PIN, DHT_SENSOR_TYPE);

void setup() {
  Serial.begin(115200);
  dht_sensor.begin();
  
  pinMode(RELAY_PIN, OUTPUT);
  digitalWrite(RELAY_PIN, LOW); // Ensure relay is OFF initially

  // Connect to Wi-Fi
  WiFi.begin(ssid, password);
  Serial.println("Connecting to Wi-Fi...");
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.print(".");
  }
  Serial.println("\nConnected to Wi-Fi");
}

void loop() {
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;

    // Reading sensor data
    float temperature = dht_sensor.readTemperature();
    float humidity = dht_sensor.readHumidity();
    float moisture = analogRead(Soil_moisture_pin);
    float soilMoisture = (100 - ((moisture / 4095.0) * 100));

    if (isnan(temperature) || isnan(humidity)) {
      Serial.println("Failed to read from DHT sensor!");
      return;
    }else {
      Serial.print("Temp: "); Serial.println(temperature);
      Serial.print("Humidity: "); Serial.println(humidity);
      Serial.print("Soil Moisture: "); Serial.println(soilMoisture);
    }


    // Sending sensor data
    http.begin(serverName);
    http.addHeader("Content-Type", "application/json");

    StaticJsonDocument<200> jsonDoc;
    jsonDoc["temperature"] = temperature;
    jsonDoc["humidity"] = humidity;
    jsonDoc["soil_moisture"] = soilMoisture;

    String jsonData;
    serializeJson(jsonDoc, jsonData);

    int httpResponseCode = http.POST(jsonData);
    if (httpResponseCode > 0) {
      Serial.print("Data Sent, Response Code: ");
      Serial.println(httpResponseCode);
    } else {
      Serial.print("Error sending data: ");
      Serial.println(httpResponseCode);
    }
    http.end();

    // Fetching control signal
    http.begin(controlServer);
    httpResponseCode = http.GET();
    if (httpResponseCode == 200) {
      String response = http.getString();
      Serial.print("Control Response: ");
      Serial.println(response);

      // Parse JSON response
      StaticJsonDocument<200> controlDoc;
      DeserializationError error = deserializeJson(controlDoc, response);
      if (!error) {
        int controlSignal = controlDoc["pump_status"];
        digitalWrite(RELAY_PIN, controlSignal == 1 ? HIGH : LOW);
        // if(soilMoisture > 60){
        //   digitalWrite(RELAY_PIN, LOW);
        // }

        if (controlSignal == 1) {
          Serial.println("Relay ON - Pump Activated");
        } else {
          Serial.println("Relay OFF - Pump Deactivated");
        }
      } else {
        Serial.print("JSON Parsing Error: ");
        Serial.println(error.c_str());
      }
    } else {
      Serial.print("Failed to get control signal: ");
      Serial.println(httpResponseCode);
    }
    http.end();
  } else {
    Serial.println("Wi-Fi Disconnected. Reconnecting...");
    WiFi.begin(ssid, password);
  }

  delay(1000); // 5-second delay before the next iteration
}
