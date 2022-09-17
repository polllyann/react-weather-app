import React, { useState } from "react";
import axios from "axios";


export default function Search() {
  const [city, changeCity] = useState("");
  const [weather, changeWeather] = useState("");
  const [loaded, setLoaded] = useState(false);

  function displayWeather(response) {
    setLoaded(true);
    changeWeather({
      city: response.data.name,
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
    <form onSubmit={handleSubmit} className="formClass" >
      <input
        type="search"
        placeholder="Enter a city..."
        className="searchBox"
        onChange={updateCity} 
      />
      <input type="submit" value="   " className="searchButton"/>
    </form>
  );

  if (loaded) {
    return (
      <div className="mB">
      <div className="bodyClass">
        {form}
        <ul className="listClass">
        <div className="row">
    <div className="col-md-6">
          <li className="cityName">{weather.city}</li>
        <li className="imageWeather">
            <img src={weather.icon} alt="" width="70px"/>
          </li>
          </div>
    <div className="col-md-6">
          <li className="tempClass">{Math.round(weather.temperature)}°C</li>
          <div className="weatherInfo">
            <li>Wind: {Math.round(weather.wind)}km/h</li>
          <li>Humidity: {Math.round(weather.humidity)}%</li>
          <li className="weatherDescription">{weather.description}</li>
         </div>
          </div>
          </div>
        </ul>
      </div>
      </div>
    );
  } else { return window.onload = function homeCity() {let homecity = `Kyiv`;
  let apiKey = `a886363dc826c8ebe5f8a1c7e752c026`;
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${homecity}&appid=${apiKey}&units=metric`;
  axios.get(url).then(displayWeather);} }}
