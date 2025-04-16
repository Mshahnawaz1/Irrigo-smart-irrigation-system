import React, { useState, useEffect } from "react";

const crops = [
  {
    name: "Wheat",
    waterRequirement: "500-600 mm",
    temperature: "10-25°C",
    npkValues: "N: 100, P: 50, K: 40",
    rainfall: "400-800 mm",
    soil: "Well-drained loamy soil",
    pH: "5.5-7.5",
    moistureLevel: "12-14%",
  },
  {
    name: "Rice",
    waterRequirement: "900-1300 mm",
    temperature: "20-30°C",
    npkValues: "N: 120, P: 60, K: 60",
    rainfall: "1000-1500 mm",
    soil: "Clayey soil with good water retention",
    pH: "5.0-6.5",
    moistureLevel: "15-18%",
  },
  {
    name: "Maize",
    waterRequirement: "400-600 mm",
    temperature: "18-27°C",
    npkValues: "N: 90, P: 40, K: 30",
    rainfall: "500-800 mm",
    soil: "Well-drained loamy soil",
    pH: "6.0-7.5",
    moistureLevel: "10-12%",
  },
  {
    name: "Potato",
    waterRequirement: "400-600 mm",
    temperature: "15-20°C",
    npkValues: "N: 150, P: 75, K: 100",
    rainfall: "400-600 mm",
    soil: "Loose, well-drained loamy soil",
    pH: "5.0-6.5",
    moistureLevel: "12-14%",
  },
  {
    name: "Tomato",
    waterRequirement: "600-800 mm",
    temperature: "18-25°C",
    npkValues: "N: 120, P: 80, K: 100",
    rainfall: "600-800 mm",
    soil: "Sandy loam soil",
    pH: "6.0-6.8",
    moistureLevel: "10-12%",
  },
];

const CropDatabase = () => {
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [soilWaterLevel, setSoilWaterLevel] = useState(0); // Example percentage

  const handleCropChange = (event) => {
    const crop = crops.find((c) => c.name === event.target.value);
    setSelectedCrop(crop);
  };
  const fetchingData = async () => {
    try {
      const response = await fetch("http://localhost:3000/data");
      const responsedata = await response.json();
      // Update current data
      setSoilWaterLevel(responsedata.soilmoisture);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };
  useEffect(() => {
    fetchingData();
    // Update data every 5 seconds
    setInterval(fetchingData, 5000);
  }, []);

  return (
    <>
      <header className="bg-green-500 p-4 text-white flex justify-between items-center">
        <h2 className="text-xl font-bold">Irrigation System Dashboard</h2>
        <div className="flex justify-evenly space-x-16">
          <a href="/">Home</a>
          <a href="/pumpstatus">Pump Status</a>
          <a href="/cropdatabase">Crop Settings</a>
          <a href="#">Logout</a>
        </div>
      </header>
      <div className="min-h-screen bg-gradient-to-b from-green-100 to-green-300 p-6 flex flex-col items-center">
        <h1 className="text-4xl font-bold text-green-800 mb-8">
          Crop Requirement Database
        </h1>

        <div className="mb-6 w-full max-w-md">
          <label
            htmlFor="crop-select"
            className="block text-lg font-medium text-green-900 mb-2"
          >
            Select Crop:
          </label>
          <select
            id="crop-select"
            onChange={handleCropChange}
            className="w-full p-2 rounded-lg border-2 border-green-700 bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-green-600"
          >
            <option value="">-- Choose a Crop --</option>
            {crops.map((crop) => (
              <option key={crop.name} value={crop.name}>
                {crop.name}
              </option>
            ))}
          </select>
        </div>

        {selectedCrop && (
          <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-green-800 mb-4">
              {selectedCrop.name} Requirements
            </h2>
            <p className="text-green-900 mb-2">
              <span className="font-semibold">Water Requirement:</span>{" "}
              {selectedCrop.waterRequirement}
            </p>
            <p className="text-green-900 mb-2">
              <span className="font-semibold">Temperature Range:</span>{" "}
              {selectedCrop.temperature}
            </p>
            <p className="text-green-900 mb-2">
              <span className="font-semibold">NPK Values:</span>{" "}
              {selectedCrop.npkValues}
            </p>
            <p className="text-green-900 mb-2">
              <span className="font-semibold">Rainfall Requirement:</span>{" "}
              {selectedCrop.rainfall}
            </p>
            <p className="text-green-900 mb-2">
              <span className="font-semibold">Soil Type:</span>{" "}
              {selectedCrop.soil}
            </p>
            <p className="text-green-900 mb-2">
              <span className="font-semibold">pH Level:</span> {selectedCrop.pH}
            </p>
            <p className="text-green-900 mb-2">
              <span className="font-semibold">Moisture Level:</span>{" "}
              {selectedCrop.moistureLevel}
            </p>
          </div>
        )}

        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-green-800 mb-4">
            Current Soil Water Level
          </h2>
          <div className="relative w-full h-8 bg-gray-200 rounded-full">
            <div
              className="h-8 rounded-full bg-green-500"
              style={{ width: `${soilWaterLevel}%` }}
            ></div>
          </div>
          <p className="text-green-900 mt-2 text-center">{soilWaterLevel}%</p>
        </div>
      </div>
    </>
  );
};

export default CropDatabase;
