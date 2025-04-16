function fetchWeather() {
  const API_KEY = "37e813d661d84461a53111553251602"; // Replace with your API key
  const place = "pune";
  const days = 3;

  // Construct the API URL using template literals
  const path = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${place}&days=${days}&aqi=no&alerts=no`;

  // Fetch weather data
  fetch(path)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((weather_dat) => {
      // Get today's precipitation
      let rain_predicted_today = weather_dat.current.precip_mm;
      console.log("Today rain:", rain_predicted_today);
      console.log(weather_dat);

      // If needed, you can access future forecast data like this:
      // let rain_predicted_tomorrow = weather_dat.forecast.forecastday[1].day.totalprecip_mm;
      // console.log("Tomorrow rain:", rain_predicted_tomorrow);
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
    });
}

// Call the function
fetchWeather();
