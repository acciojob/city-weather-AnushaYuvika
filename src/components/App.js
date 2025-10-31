import React, { useState } from "react";
import "./../styles/App.css";
import "regenerator-runtime/runtime";


const API_KEY = "b6907d289e10d714a6e88b30761fae22"; 

const App = () => {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    if (!query.trim()) return;

    try {
      setError("");
      setWeather(null);

      const res = await fetch(
        `https://samples.openweathermap.org/data/2.5/weather?q=${query}&appid=${API_KEY}&units=imperial`

      );

      if (!res.ok) {
        throw new Error("City not found");
      }

      const data = await res.json();
      setWeather(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      fetchWeather();
    }
  };

  return (
    <div id="main" style={{ textAlign: "center", marginTop: "40px" }}>
      <h1>City Weather</h1>
      <input
        className="search"
        type="text"
        placeholder="Enter city..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={handleKeyPress}
        style={{
          padding: "8px",
          width: "220px",
          borderRadius: "5px",
          marginBottom: "20px"
        }}
      />

      {error && <p style={{ color: "red" }}>{error}</p>}

      {weather && (
        <div className="weather" style={{ marginTop: "20px" }}>
          <h2>{weather.name}</h2>
          <h3>{Math.round(weather.main.temp)} °F</h3>
          <p>{weather.weather[0].description}</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
          />
        </div>
      )}
    </div>
  );
};

export default App;
