import React, { useState } from 'react';
import WeatherCard from './components/weathercard.js';
import './App.css';

const App = () => {
  const [location, setLocation] = useState('');
  const [weather, setWeather] = useState(null);
  const apiKey = '80910612dcf7b8881a64531ad282247c';

  const fetchWeather = async (query) => {
    try {
      const response = await fetch(query);
      const data = await response.json();
      if (data && data.main) {
        setWeather(data);
      } else {
        console.error('Invalid response structure', data);
        setWeather(null);
      }
    } catch (error) {
      console.error('Error fetching weather data', error);
      setWeather(null);
    }
  };

  const fetchWeatherByLocation = () => {
    if (location) {
      const query = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
      fetchWeather(query);
    }
  };

  const fetchWeatherByCoordinates = (latitude, longitude) => {
    const query = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
    fetchWeather(query);
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeatherByCoordinates(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          console.error('Error getting location', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  return (
    <div className="container">
      <h1 className="title">Weather App</h1>
      <div className="input-container">
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter location"
          className="input"
        />
        <button onClick={fetchWeatherByLocation} className="button">Search</button>
        <button onClick={getCurrentLocation} className="button">Current Location</button>
      </div>
      {weather && <WeatherCard weather={weather} />}
    </div>
  );
};

export default App;
