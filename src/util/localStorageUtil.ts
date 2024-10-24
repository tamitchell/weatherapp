import {
  Units,
  LastLocation,
  WeatherState,
  WeatherCacheKey,
} from 'src/types/types';
import getFromLocalStorage from './getFromLocalStorage/getFromLocalStorage';

// Specific getter functions for your use case
export const getUnitsFromLocalStorage = (): Units =>
  getFromLocalStorage<Units>('weatherUnits', 'imperial');

export const getLastLocationFromLocalStorage = (): LastLocation | null =>
  getFromLocalStorage<LastLocation | null>('lastLocation', null);

export const getCachedWeatherData = (
  lat: number,
  lng: number,
  units: Units
): WeatherState | null => {
  const cacheKey: WeatherCacheKey = `weather_${lat}_${lng}_${units}`;
  const cachedData = getFromLocalStorage<{
    data: WeatherState;
    timestamp: number;
  } | null>(cacheKey, null);

  if (cachedData) {
    const cacheAge = Date.now() - cachedData.timestamp;
    if (cacheAge < 30 * 60 * 1000) {
      // 30 minutes
      return cachedData.data;
    }
  }

  return null;
};
