import React, { useState } from "react";
import axios from "axios";


export default function Search() {
  const [city, changeCity] = useState("");
  const [weather, changeWeather] = useState("");
  const [loaded, setLoaded] = useState(false);

  function displayWeather(response) {
    setLoaded(true);
    changeWeather({
      temperature: response.data.main.temp,
      wind: response.data.wind.speed,
      humidity: response.data.main.humidity,
      description: response.data.weather[0].description,
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    let apiKey = `a886363dc826c8ebe5f8a1c7e752c026`;
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(url).then(displayWeather);
  }

  function updateCity(event) {
    changeCity(event.target.value);
  }

  let form = (
    <form onSubmit={handleSubmit}>
      <input
        type="search"
        placeholder="Enter a city..."
        onChange={updateCity}
      />
      <input type="submit" value="Search" />
    </form>
  );

  if (loaded) {
    return (
      <div>
        {form}
        <ul className="listClass">
          <li>Temperature: {Math.round(weather.temperature)}°C</li>
          <li>Wind: {Math.round(weather.wind)}km/h</li>
          <li>Humidity: {Math.round(weather.humidity)}%</li>
          <li>{weather.description}</li>
          <li>
            <img src={weather.icon} alt="" />{" "}
          </li>
        </ul>
      </div>
    );
  } else {
    return form;
  }
}
