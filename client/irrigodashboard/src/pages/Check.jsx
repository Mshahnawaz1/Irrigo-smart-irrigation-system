// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Line } from "react-chartjs-2";
// import { Routes, Route } from "react-router-dom";
// import "chart.js/auto"; // Automatically register all chart components
// import backgroundImage from "./assets/image.png";
// import Dashboard from "./components/Dashboard";
// const bkg = backgroundImage;
// import Pumpstatus from "./pages/Pumpstatus";

// const App = () => {
//   const [data, setData] = useState({
//     temperature: 0,
//     humidity: 0,
//     soilmoisture: 0,

//     moistureData: [],
//     temperatureData: [],
//   });
//   const fetchingData = async () => {
//     try {
//       const response = await fetch("http://localhost:3000/data", {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });
//       const responsedata = await response.json();
//       // console.log(data);

//       setData(responsedata);
//     } catch (err) {
//       console.error("Error fetching data:", err);
//     }
//   };

//   useEffect(() => {
//     // Fetch data from the backend
//     fetchingData();
//   }, []);

//   // Chart data for moisture
//   const moistureChartData = {
//     labels: (data.moistureData || []).map((_, index) => `Day ${index + 1}`),
//     datasets: [
//       {
//         label: "Soil Moisture (%)",
//         data: data.moistureData || [],
//         borderColor: "#0000FF",
//         backgroundColor: "rgba(0, 0, 255, 0.2)",
//         tension: 0.4,
//       },
//     ],
//   };

//   // Chart data for temperature
//   const temperatureChartData = {
//     labels: (data.temperatureData || []).map((_, index) => `Day ${index + 1}`),
//     datasets: [
//       {
//         label: "Temperature (°C)",
//         data: data.temperatureData || [],
//         borderColor: "#FF0000",
//         backgroundColor: "rgba(255, 0, 0, 0.2)",
//         tension: 0.4,
//       },
//     ],
//   };

//   return (
//     // <div className="container mx-auto p-4">
//     //   <header className="bg-green-500 p-4 text-white text-xl font-bold">
//     //     Irrigation System Dashboard
//     //   </header>

//     //   <div
//     //     className="flex justify-between my-4 ]"
//     //     style={{
//     //       backgroundImage: `url(${bkg})`,
//     //       backgroundSize: "cover",
//     //       backgroundPosition: "center",
//     //       backgroundRepeat: "no-repeat",
//     //     }}
//     //   >
//     //     <div className="bg-blue-100 p-4 mx-10 my-16 rounded-lg shadow-md w-1/4 text-center">
//     //       <h3 className="font-bold">Soil Moisture</h3>
//     //       <p>{data.soilMoisture}%</p>
//     //     </div>
//     //     <div className="bg-yellow-100 p-4  mx-10 my-16 rounded-lg shadow-md w-1/4 text-center">
//     //       <h3 className="font-bold">Humidity</h3>
//     //       <p>{data.humidity}%</p>
//     //     </div>
//     //     <div className="bg-red-100 p-4  mx-10 my-16 rounded-lg shadow-md w-1/4 text-center">
//     //       <h3 className="font-bold">Temperature</h3>
//     //       <p>{data.temperature}°C</p>
//     //     </div>
//     //   </div>

//     //   <div className="grid grid-cols-2">
//     //     {/* Moisture Data Chart */}
//     //     <div>
//     //       <h3 className="text-xl font-bold my-4">Moisture DATA</h3>
//     //       <Line data={moistureChartData} />
//     //     </div>

//     //     {/* Temperature Data Chart */}
//     //     <div>
//     //       <h3 className="text-xl font-bold my-4">Temperature DATA</h3>
//     //       <Line data={temperatureChartData} />
//     //     </div>
//     //   </div>
//     // </div>
//     <Routes>
//       <Route path="/" element={<Dashboard />} />
//       <Route path="/pumpstatus" element={<Pumpstatus />} />
//     </Routes>
//   );
// };

// export default App;
