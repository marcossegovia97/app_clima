// src/App.js
import React, { useState } from 'react';
import { getWeatherByCity, get7DayForecast } from './services/weatherService';
import './App.css';

const App = () => {
    const [city, setCity] = useState("Madrid"); // Ciudad predeterminada
    const [weather, setWeather] = useState(null);
    const [forecast, setForecast] = useState(null);
    const [error, setError] = useState("");

    const fetchWeatherData = async () => {
        const data = await getWeatherByCity(city);
        if (data) {
            setWeather(data);
            const forecastData = await get7DayForecast(data.coord.lat, data.coord.lon);
            console.log("7-day forecast data:", forecastData); // Verifica que el pronóstico se obtenga
            setForecast(forecastData);
            setError("");
        } else {
            setError("Ciudad no encontrada. Inténtalo de nuevo.");
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        fetchWeatherData();
    };

    React.useEffect(() => {
        fetchWeatherData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="weather-app">
            <h1>Aplicación de Clima</h1>
            <form onSubmit={handleSearch} className="search-form">
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Buscar ciudad..."
                    className="search-input"
                />
                <button type="submit" className="search-button">Buscar</button>
            </form>
            {error && <p className="error-message">{error}</p>}
            {weather && (
                <div className="current-weather">
                    <h2>Clima en {weather.name}</h2>
                    <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="Weather icon" />
                    <p>Temperatura: {weather.main.temp}°C</p>
                    <p>Descripción: {descriptionMap[weather.weather[0].description] || weather.weather[0].description}</p>
                    <p>Temperatura Máxima: {weather.main.temp_max}°C</p>
                    <p>Temperatura Mínima: {weather.main.temp_min}°C</p>
                    <p>Humedad: {weather.main.humidity}%</p>
                    <p>Viento: {weather.wind.speed} m/s</p>
                </div>
            )}
            {forecast && (
                <div className="forecast">
                    <h3>Pronóstico para los Próximos 7 Días</h3>
                    <div className="forecast-container">
                        {forecast.daily.slice(1, 8).map((day, index) => (
                            <div key={index} className="forecast-day">
                                <p>Temp Max: {day.temp.max}°C</p>
                                <p>Temp Min: {day.temp.min}°C</p>
                                <p>Descripción: {descriptionMap[day.weather[0].description] || day.weather[0].description}</p>
                                <img src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`} alt="Weather icon" />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

const descriptionMap = {
    "fog": "Niebla",
    "clear sky": "Cielo despejado",
    "rain": "Lluvia",
    // Agrega más traducciones según sea necesario
};

export default App;



