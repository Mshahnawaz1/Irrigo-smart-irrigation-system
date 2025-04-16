import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto"; // Automatically register all chart components
import backgroundImage from "../assets/image.png";

const bkg = backgroundImage;

const Dashboard = () => {
  const [data, setData] = useState({
    temperature: 27,
    humidity: 88,
    soilmoisture: 56,
  });

  const [historicalData, setHistoricalData] = useState({
    temperatureData: [],
    moistureData: [],
    timestamps: [],
  });

  // Fetching data function
  const fetchingData = async () => {
    try {
      const response = await fetch("http://localhost:3000/data");
      const responsedata = await response.json();
      console.log(responsedata);

      // Update current data
      setData(responsedata);

      // Store historical data (for past 24 hours)
      setHistoricalData((prev) => {
        const newTimestamps = [
          ...prev.timestamps,
          new Date().toLocaleTimeString(),
        ];
        const newTemperatureData = [
          ...prev.temperatureData,
          responsedata.temperature,
        ];
        const newMoistureData = [
          ...prev.moistureData,
          responsedata.soilmoisture,
        ];

        // Keep only the latest 24 points (assuming data is fetched once per hour or as needed)
        if (newTimestamps.length > 24) {
          newTimestamps.shift();
          newTemperatureData.shift();
          newMoistureData.shift();
        }

        return {
          temperatureData: newTemperatureData,
          moistureData: newMoistureData,
          timestamps: newTimestamps,
        };
      });
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    // Fetch data every 5 seconds to simulate real-time updates
    fetchingData();
    const interval = setInterval(fetchingData, 5000); // Fetch every 5 seconds
    return () => clearInterval(interval); // Clear interval when component unmounts
  }, []);

  // Real-time graph data
  const realTimeTemperatureChartData = {
    labels: historicalData.timestamps,
    datasets: [
      {
        label: "Temperature (°C)",
        data: historicalData.temperatureData,
        borderColor: "#FF0000",
        backgroundColor: "rgba(255, 0, 0, 0.2)",
        tension: 0.3,
      },
    ],
  };

  const realTimeMoistureChartData = {
    labels: historicalData.timestamps,
    datasets: [
      {
        label: "Soil Moisture (%)",
        data: historicalData.moistureData,
        borderColor: "#0000FF",
        backgroundColor: "rgba(0, 0, 255, 0.2)",
        tension: 0.3,
      },
    ],
  };

  return (
    <div className="container mx-auto p-4">
      <header className="bg-green-500 p-4 text-white flex justify-between items-center">
        <h2 className="text-xl font-bold">Irrigation System Dashboard</h2>
        <div className="flex justify-evenly space-x-16">
          <a href="/">Home</a>
          <a href="/pumpstatus">Pump Status</a>
          <a href="/cropdatabase">Crop Settings</a>
          <a href="#">Logout</a>
        </div>
      </header>

      <div
        className="flex justify-between my-4"
        style={{
          backgroundImage: `url(${bkg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="bg-blue-100 p-10 mx-10 my-20 rounded-lg shadow-md w-1/4 text-center">
          <h3 className="font-bold text-xl">Soil Moisture</h3>
          <p className="text-xl">{data.soilmoisture}%</p>
        </div>
        <div className="bg-yellow-100 p-10 mx-10 my-20 rounded-lg shadow-md w-1/4 text-center">
          <h3 className="font-bold text-xl">Humidity</h3>
          <p className="text-xl">{data.humidity || 82}%</p>
        </div>
        <div className="bg-red-100 p-10 mx-10 my-20 rounded-lg shadow-md w-1/4 text-center">
          <h3 className="font-bold text-xl">Temperature</h3>
          <p className="text-xl">{data.temperature || 24}°C</p>
        </div>
      </div>

      <div className="grid grid-cols-2">
        {/* Real-Time Temperature Data Chart */}
        <div>
          <h3 className="text-xl font-bold my-4">Real-Time Temperature Data</h3>
          <Line data={realTimeTemperatureChartData} />
        </div>

        {/* Real-Time Soil Moisture Data Chart */}
        <div>
          <h3 className="text-xl font-bold my-4">
            Real-Time Soil Moisture Data
          </h3>
          <Line data={realTimeMoistureChartData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
