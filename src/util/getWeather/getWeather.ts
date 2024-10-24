import { Units, WeatherData, ForecastData, AirQualityResponse } from "src/types/types";

export async function getWeather(lat: number, lng: number, units: Units) {
    const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL ?? 'http://localhost:3000';
  
    try {
      const [weatherRes, forecastRes, airQualityRes] = await Promise.all([
        fetch(`${baseUrl}/api/weather?lat=${lat}&lng=${lng}&units=${units}`),
        fetch(`${baseUrl}/api/weather/forecast?lat=${lat}&lng=${lng}&units=${units}`),
        fetch(`${baseUrl}/api/weather/air_pollution?lat=${lat}&lng=${lng}&units=${units}`),
      ]);
  
      if (!weatherRes.ok || !forecastRes.ok || !airQualityRes.ok) {
        throw new Error('Failed to fetch weather data');
      }
  
      const weather: WeatherData = await weatherRes.json();
      const forecastData: ForecastData = await forecastRes.json();
      const airQuality: AirQualityResponse = await airQualityRes.json();
  
      return {
        weather,
        forecast: forecastData.list,
        airQuality,
      };
    } catch (error) {
      console.error('Error fetching weather:', error);
      throw error;
    }
  }