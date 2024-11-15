// src/services/weatherService.js
import axios from 'axios';

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

// Obtener el clima actual y las coordenadas de la ciudad
export const getWeatherByCity = async (city) => {
    try {
        const response = await axios.get(`${BASE_URL}/weather`, {
            params: {
                q: city,
                appid: API_KEY,
                units: "metric",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching weather data:", error);
        return null;
    }
};

// Obtener el pronóstico de 7 días usando las coordenadas
export const get7DayForecast = async (lat, lon) => {
    try {
        const response = await axios.get(`${BASE_URL}/onecall`, {
            params: {
                lat,
                lon,
                appid: API_KEY,
                units: "metric",
                exclude: "minutely,hourly,alerts", // Excluye datos innecesarios
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching 7-day forecast:", error);
        return null;
    }
};


