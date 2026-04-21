import React, { useState, useEffect } from "react";

const Rainprediction = () => {
  const [location, setLocation] = useState("Loading...");
  const [temperature, setTemperature] = useState("--");
  const [precipitation, setPrecipitation] = useState("--");
  const [condition, setCondition] = useState("--");
  const [icon, setIcon] = useState("");

  const API_KEY = "37e813d661d84461a53111553251602"; // Replace with your API key

  useEffect(() => {
    // Function to fetch weather data
    const fetchWeather = (lat, lon) => {
      const path = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${lat},${lon}&days=1&aqi=no&alerts=no`;

      fetch(path)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((weatherData) => {
          setLocation(
            `${weatherData.location.name}, ${weatherData.location.region}`
          );
          setTemperature(`${weatherData.current.temp_c} °C`);
          setPrecipitation(`${weatherData.current.precip_mm} mm`);
          setCondition(weatherData.current.condition.text);
          setIcon(`https:${weatherData.current.condition.icon}`);
        })
        .catch((error) => {
          console.error("Error fetching weather data:", error);
          setLocation("Unable to fetch weather data.");
        });
    };

    // Function to get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          fetchWeather(lat, lon);
        },
        (error) => {
          console.error("Error getting location:", error);
          setLocation("Unable to retrieve location.");
        }
      );
    } else {
      setLocation("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-blue-100 rounded-lg shadow-lg max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Weather App</h1>
      <p className="text-lg text-gray-700">
        <span className="font-medium">Location: </span>
        {location}
      </p>
      <p className="text-lg text-gray-700">
        <span className="font-medium">Temperature: </span>
        {temperature}
      </p>
      <p className="text-lg text-gray-700">
        <span className="font-medium">Precipitation: </span>
        {precipitation}
      </p>
      <p className="text-lg text-gray-700">
        <span className="font-medium">Condition: </span>
        {condition}
      </p>
      {icon && <img src={icon} alt="Weather Icon" className="mt-4 w-24 h-24" />}
    </div>
  );
};

export default Rainprediction;
