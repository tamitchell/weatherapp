import { ForecastItem, Units } from 'src/types/types';

const getBaseUrl = () => {
  if (typeof window !== 'undefined') {
    // Always use the current URL the user is on
    return window.location.origin;
  }
  
  // Fallbacks for SSR only
  if (process.env.NEXT_PUBLIC_VERCEL_URL) {
    return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
  }
  
  return 'http://localhost:3000';
};
export const fetchCurrentWeather = async (
  lat: number,
  lng: number,
  units: Units
) => {
  const baseUrl = getBaseUrl();
  const response = await fetch(
    `${baseUrl}/api/weather?lat=${lat}&lng=${lng}&units=${units}`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch current weather');
  }

  return response.json();
};

export const fetchForecast = async (
  lat: number,
  lng: number,
  units: Units
): Promise<ForecastItem[]> => {
  const baseUrl = getBaseUrl();
  const response = await fetch(
    `${baseUrl}/api/weather/forecast?lat=${lat}&lng=${lng}&units=${units}`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch forecast');
  }

  const data = await response.json();

  if (!data || !Array.isArray(data.list)) {
    throw new Error('Invalid forecast data structure');
  }

  return data.list;
};

export const fetchAirQuality = async (
  lat: number,
  lng: number,
  units: Units
) => {
  const baseUrl = getBaseUrl();
  const response = await fetch(
    `${baseUrl}/api/weather/air_pollution?lat=${lat}&lng=${lng}&units=${units}`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch air quality');
  }

  return response.json();
};
