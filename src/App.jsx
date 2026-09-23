import { useState, useEffect } from "react";
import SearchBar from "./components/Searchbar";
import WeatherCard from "./components/weathercard";
import "./index.css";

// Read the API key from Vite's environment variables (see .env setup below)
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetches current weather for a given city from OpenWeatherMap
  const fetchWeather = async (city) => {
    if (!API_KEY) {
      setError("Missing API key. Add VITE_WEATHER_API_KEY to your .env file.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${BASE_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`,
      );

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error(
            `We couldn't find "${city}". Check the spelling and try again.`,
          );
        }
        throw new Error(
          "Something went wrong while fetching the weather. Please try again.",
        );
      }

      const data = await response.json();
      setWeatherData(data);
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  // Load a default city once when the app first mounts
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchWeather("Lagos");
  }, []);

  return (
    <div className="app">
      <h1 className="app__title">Weather</h1>
      <SearchBar onSearch={fetchWeather} loading={loading} />

      {loading && (
        <div className="status-card">
          <div className="spinner" />
          <p>Fetching the latest weather…</p>
        </div>
      )}

      {!loading && error && <div className="error-card">{error}</div>}

      {!loading && !error && weatherData && <WeatherCard data={weatherData} />}
    </div>
  );
}

export default App;
