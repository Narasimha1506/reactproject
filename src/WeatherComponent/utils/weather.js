export async function fetchWeather(city) {
    const apiKey = 'YOUR_API_KEY'; // Replace with your actual API key
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    const data = await response.json();
    return data;
  }
  