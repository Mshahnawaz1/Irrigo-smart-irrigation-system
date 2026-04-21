import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import { Routes, Route } from "react-router-dom";
import "chart.js/auto"; // Automatically register all chart components
import backgroundImage from "./assets/image.png";
import Dashboard from "./components/Dashboard";
const bkg = backgroundImage;
import Pumpstatus from "./pages/Pumpstatus";
import CropDatabase from "./pages/CropDatabase";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/pumpstatus" element={<Pumpstatus />} />
        <Route path="/cropdatabase" element={<CropDatabase />} />
      </Routes>
    </>
  );
};

export default App;
