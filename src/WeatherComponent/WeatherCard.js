import React from 'react';
import './WeatherCard.css';

const WeatherCard = ({ weather }) => {
  const getBackgroundColor = (description) => {
    switch (description) {
      case 'clear sky':
        return '#87CEEB';
      case 'few clouds':
      case 'scattered clouds':
      case 'broken clouds':
        return '#B0C4DE'; 
      case 'shower rain':
      case 'rain':
        return '#4682B4'; 
      case 'thunderstorm':
        return '#708090'; 
      case 'snow':
         return '#FFFFFF'; 
      case 'mist':
        return '#F5F5F5'; 
      default:
        return '#5ea5ad'; 
    }
  };

  const backgroundColor = getBackgroundColor(weather.weather[0].description);
  const iconUrl = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`; 
  return (
    <div className="weather-card" style={{ backgroundColor }}>
      <h2 className="weather-title">{weather.name}</h2>
      <img src={iconUrl} alt={weather.weather[0].description} className="weather-image" />
      <p className="weather-description">{weather.weather[0].description}</p>
      <p className="weather-temp">Temperature: {weather.main.temp}°C</p>
      <p className="weather-humidity">Humidity: {weather.main.humidity}%</p>
    </div>
  );
};

export default WeatherCard;



