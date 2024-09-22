
import { WeatherData } from "@/types";
import ClientSideHome from "./clientSideHome";

async function getInitialWeather() {
  // Default to New York City
  const lat = 40.7128;
  const lng = -74.0060;

  const apiKey = process.env.OPENWEATHER_API_KEY;
  const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lng}&appid=${apiKey}&units=metric`;
  
  try {
    const response = await fetch(url);
    const weatherData: WeatherData = await response.json();
    return { weatherData, address: "New York City" };
  } catch (error) {
    console.error('Error fetching initial weather data:', error);
    return { weatherData: null, address: "" };
  }
}

export default async function Home() {
  const { weatherData: initialWeather, address: initialAddress } = await getInitialWeather();

  return (
    <ClientSideHome initialWeather={initialWeather} initialAddress={initialAddress} />
  );
}