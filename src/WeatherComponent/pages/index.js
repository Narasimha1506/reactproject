import { useState } from 'react';
import { fetchWeather } from '../utils/weather';
import SearchBar from '../components/SearchBar';
import WeatherDisplay from '../components/WeatherDisplay';

export default function Home() {
  const [weather, setWeather] = useState(null);

  const handleSearch = async (city) => {
    const data = await fetchWeather(city);
    setWeather(data);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Weather App</h1>
      <SearchBar onSearch={handleSearch} />
      <WeatherDisplay weather={weather} />
    </div>
  );
}
