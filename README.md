<div align="center">

# 🌱 Irrigo — Predictive Smart Irrigation System

**An IoT-powered precision irrigation platform that uses real-time sensor data, live weather feeds, and machine learning to automate water pump control.**

[![Flask](https://img.shields.io/badge/Backend-Flask-000000?style=flat&logo=flask&logoColor=white)](https://flask.palletsprojects.com/)
[![React](https://img.shields.io/badge/Frontend-React-61DAFB?style=flat&logo=react&logoColor=black)](https://react.dev/)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=flat&logo=vercel&logoColor=white)](https://vercel.com/)
[![ESP32](https://img.shields.io/badge/Hardware-ESP32-E7352C?style=flat&logo=espressif&logoColor=white)](https://www.espressif.com/)
[![scikit-learn](https://img.shields.io/badge/ML-scikit--learn-F7931E?style=flat&logo=scikit-learn&logoColor=white)](https://scikit-learn.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

</div>

---

## 📖 Overview

Irrigo is an end-to-end smart irrigation system that eliminates water wastage by making data-driven decisions about when to activate a water pump. The system collects real-time environmental data from onboard sensors (soil moisture, temperature, humidity) and live weather APIs, feeds this data into a trained **Random Forest Regression** model, and outputs a pump activation decision — all visible on a real-time web dashboard.

> Designed for rooftop farming, small-to-medium farms, and research plots where precise, automated irrigation matters.

---

## ✨ Features

- 📡 **Real-time sensor telemetry** — soil moisture, ambient temperature, and humidity via ESP32
- 🌦️ **Live weather integration** — enriches local sensor data with forecast and current conditions
- 🤖 **ML-powered prediction** — Random Forest model estimates water requirement and pump status
- 📊 **Live dashboard** — React-based UI with real-time data visualisation
- ⚡ **Low-latency pipeline** — ESP32 → Flask server → dashboard, end-to-end in seconds

---

## 🧰 Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Hardware** | ESP32 Microcontroller | Sensor hub & Wi-Fi data transmission |
| **Sensors** | Soil Moisture Sensor, DHT11/DHT22 | Environmental data acquisition |
| **Backend** | Python / Flask | REST API, data processing, ML inference |
| **ML Model** | scikit-learn — Random Forest Regressor | Water requirement prediction & pump control |
| **Training Data** | Synthetic dataset | Model training & validation |
| **Frontend** | React (JavaScript) | Real-time monitoring dashboard |
| **Deployment** | Vercel | Frontend hosting & CI/CD |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        FIELD / HARDWARE                         │
│                                                                 │
│   ┌──────────────────┐      ┌──────────────────────────────┐   │
│   │  Soil Moisture   │      │     DHT11 / DHT22 Sensor     │   │
│   │     Sensor       │      │  (Temperature + Humidity)    │   │
│   └────────┬─────────┘      └──────────────┬───────────────┘   │
│            │                               │                    │
│            └───────────────┬───────────────┘                    │
│                            ▼                                    │
│                   ┌─────────────────┐                          │
│                   │      ESP32      │  ── Wi-Fi ──►            │
│                   └─────────────────┘                          │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼  HTTP POST (JSON)
┌─────────────────────────────────────────────────────────────────┐
│                      LOCAL FLASK SERVER                         │
│                                                                 │
│   ┌────────────────┐    ┌─────────────┐    ┌────────────────┐  │
│   │  Data Ingress  │───►│Weather API  │───►│ Pre-processing │  │
│   │  /api/data     │    │   Fetch     │    │   & Merging    │  │
│   └────────────────┘    └─────────────┘    └───────┬────────┘  │
│                                                     │           │
│                                                     ▼           │
│                                          ┌──────────────────┐  │
│                                          │  Random Forest   │  │
│                                          │  Regressor Model │  │
│                                          └────────┬─────────┘  │
│                                                   │            │
│                                          ┌────────▼─────────┐  │
│                                          │ Prediction Result│  │
│                                          │ • Water Req (mm) │  │
│                                          │ • Pump Status    │  │
│                                          └────────┬─────────┘  │
└───────────────────────────────────────────────────┼────────────┘
                                                     │
                                                     ▼  REST API
┌─────────────────────────────────────────────────────────────────┐
│                   REACT DASHBOARD  (Vercel)                     │
│                                                                 │
│     Sensor Readings  │  Weather Data  │  Pump Status  │ Logs   │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🔄 Workflow

### 1. Data Collection
The **ESP32** continuously reads:
- 💧 **Soil moisture** level (analog/digital from capacitive or resistive sensor)
- 🌡️ **Temperature** and **humidity** from the DHT sensor

Readings are packaged as a JSON payload and sent over Wi-Fi to the local Flask server via HTTP POST.

### 2. Weather Data Enrichment
On receiving a sensor payload, the Flask server calls an **open-access weather API** to fetch current and forecast conditions (precipitation probability, rainfall, cloud cover, etc.) for the deployment location. This data is merged with the sensor readings to form a complete feature vector.

### 3. ML Inference
The enriched feature vector is passed to a pre-trained **Random Forest Regression** model. The model was trained on a synthetic dataset that simulates diverse soil, weather, and crop conditions. It outputs:
- **Predicted water requirement** (in mm or litres)
- **Pump status** — `ON` (irrigation needed) or `OFF` (sufficient moisture)

### 4. Dashboard Update
Prediction results and raw sensor data are exposed via a REST endpoint on the Flask server. The **React dashboard** polls or subscribes to this endpoint and displays:
- Live sensor readings (soil moisture, temperature, humidity)
- Current weather conditions
- Predicted water requirement
- Pump status (with history/log)

---

## 📁 Project Structure

```
├── client/
│   ├── backend/
│   └── irrigodashboard/
├── ESP32/
│   └── sensor_data.ino
├── server/
│   ├── models/
│   ├── notebooks/
│   ├── data/
│   ├── app.py
│   ├── model_test.py
├── Codefinity.pptx
└── README.md
```

<div>
Made by M Shahnawaz
</div>