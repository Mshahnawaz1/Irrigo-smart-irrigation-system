import React, { useEffect } from "react";
import { useState } from "react";
// Images for the farmer to interpret
import moistureHighImage from "../assets/soilh.jpeg";
import moistureLowImage from "../assets/soilhi.png";
import pumpOnImage from "../assets/pump.png";
import pumpOffImage from "../assets/pump.png";
import temperatureHotImage from "../assets/temph.png";
import temperatureCoolImage from "../assets/templ.png";
import Rainprediction from "../components/Rainprediction";
import water from "../assets/water.png";

const Pumpstatus = () => {
  const [soilMoisture, setSoilMoisture] = useState(0);
  const [pumpStatus, setPumpStatus] = useState("On");
  const [temperature, setTemperature] = useState(28); // Degrees Celsius
  const [waterreq, setwaterreq] = useState(30); // Battery percentage

  const fetchingData = async () => {
    try {
      const response = await fetch("http://localhost:3000/data");
      const responsedata = await response.json();
      const controlresponse = await fetch("http://localhost:3000/control");
      const controlresponsedata = await controlresponse.json();
      console.log(controlresponsedata);
      // console.log(responsedata);

      // Update current data
      setSoilMoisture(responsedata.soilmoisture);
      setTemperature(responsedata.temperature);
      setPumpStatus(controlresponsedata.pump_status === 1 ? "On" : "Off");
      setwaterreq(controlresponsedata.water_required);
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
      {/* bg-gradient-to-b from-amber-100 to-amber-50 */}
      <div className=" bg-gradient-to-b from-[#1f2120] to-black min-h-screen">
        <h1 className="text-4xl font-bold  bg-[#1f2120] text-[#96facb] p-6 text-center ">
          Soil & Irrigation Monitoring
        </h1>
        <div className="grid grid-cols-4 gap-6 items-center justify-center m-10   p-4 mx-auto">
          {/* Soil Moisture Section */}
          <div className="rounded-lg shadow-lg bg-gradient-to-br from-red-400 to-red-200  p-6 w-full max-w-md ">
            <h2 className="text-xl font-semibold mb-4 text-white">
              Soil Moisture
            </h2>
            <div className="flex items-center justify-between">
              <p className="text-3xl font-bold text-white">{soilMoisture}%</p>
              <img
                src={soilMoisture > 50 ? moistureHighImage : moistureLowImage}
                alt="Moisture Status"
                className="h-16 w-16 "
              />
            </div>
          </div>

          {/* Pump Status Section */}
          <div className="rounded-lg shadow-lg bg-gradient-to-br from-amber-200 to-amber-100 p-6 w-full max-w-md ">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              Pump Status
            </h2>
            <div className="flex items-center justify-between">
              <p
                className={`text-3xl font-bold ${
                  pumpStatus === "On" ? "text-green-500" : "text-red-400"
                } `}
              >
                {pumpStatus}
              </p>
              <img
                src={pumpStatus === "On" ? pumpOnImage : pumpOffImage}
                alt="Pump Status"
                className="h-16 w-16"
              />
            </div>
          </div>
          {/*  */}
          <div className="rounded-lg shadow-lg bg-gradient-to-br from-teal-300 to-teal-100 p-6 w-full max-w-md ">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              Water Required (Lt)
            </h2>
            <div className="flex items-center justify-between">
              <p className={`text-3xl font-bold text-black `}>
                {waterreq.toFixed(1)}
              </p>
              <img src={water} alt="Pump Status" className="h-16 w-16" />
            </div>
          </div>

          {/* Temperature Section */}
          <div className="rounded-lg shadow-lg bg-gradient-to-br from-purple-300 to-purple-200 p-6 w-full max-w-md ">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              Temperature
            </h2>
            <div className="flex items-center justify-between">
              <p className="text-3xl font-bold text-gray-900">
                {temperature}°C
              </p>
              <img
                src={
                  temperature > 30 ? temperatureHotImage : temperatureCoolImage
                }
                alt="Temperature Status"
                className="h-16 w-16"
              />
            </div>
          </div>
        </div>
        {/* Recommendations Section */}
        <div className="rounded-lg shadow-lg bg-white p-6  mx-20">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Recommendations
          </h2>
          <p className="text-gray-800">
            {soilMoisture < 30
              ? "Soil moisture is low. Please turn the pump ON to ensure adequate irrigation."
              : "Soil moisture is sufficient. Keep the pump OFF to avoid over-irrigation."}
          </p>
        </div>
        <Rainprediction />
      </div>
    </>
  );
};

export default Pumpstatus;
