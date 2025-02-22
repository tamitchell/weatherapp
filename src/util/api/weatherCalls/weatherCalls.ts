import { ForecastItem, Units } from 'src/types/types';
import getBaseUrl from '../getBaseUrl';

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
