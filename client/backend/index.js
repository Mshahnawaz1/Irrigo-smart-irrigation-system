const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

//

let temperature = null;
let humidity = null;
let soilmoisture = null;
let pump_status = null;
let water_required = null;
app.get("/", (req, res) => {
  res.send("Hello World");
});
app.post("/data", (req, res) => {
  console.log("Data received:", req.body);
  temperature = req.body.temperature;
  humidity = req.body.humidity;
  soilmoisture = req.body.soil_moisture;
  // console.log(soilmoisture);

  res.status(200).json({ message: "Data received successfully" });
});

app.get("/data", (req, res) => {
  res.json({
    temperature: temperature,
    humidity: humidity,
    soilmoisture: soilmoisture,
  });
});

app.post("/control", (req, res) => {
  console.log("Command received:", req.body);
  pump_status = req.body.pump_status;
  water_required = req.body.water_required;
  res.status(200).json({ message: " control Data received successfully" });
});
app.get("/control", (req, res) => {
  console.log("Pump status:", pump_status);
  res.json({ pump_status: pump_status, water_required: water_required });
});

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
