import { Units, LastLocation, WeatherState, WeatherCacheKey } from "src/types/types";

export const getFromLocalStorage = <T>(key: string, defaultValue: T): T => {
  if (typeof window === 'undefined') {
    return defaultValue;
  }

  try {
    const item = window.localStorage.getItem(key);
    if (item === null) {
      return defaultValue;
    }

    // Attempt to parse the item
    const parsedItem = JSON.parse(item);
    
    // Check if the parsed item is of the expected type
    if (typeof parsedItem === typeof defaultValue) {
      return parsedItem as T;
    } else {
      console.warn(`Retrieved item for key "${key}" is not of the expected type. Using default value.`);
      return defaultValue;
    }
  } catch (error) {
    console.error(`Error retrieving item for key "${key}" from localStorage:`, error);
    return defaultValue;
  }
};

export const setToLocalStorage = <T>(key: string, value: T): void => {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    const serializedValue = JSON.stringify(value);
    window.localStorage.setItem(key, serializedValue);
  } catch (error) {
    console.error(`Error setting item for key "${key}" in localStorage:`, error);
  }
};

// Specific getter functions for your use case
export const getUnitsFromLocalStorage = (): Units => 
  getFromLocalStorage<Units>('weatherUnits', 'imperial');

export const getLastLocationFromLocalStorage = (): LastLocation | null => 
  getFromLocalStorage<LastLocation | null>('lastLocation', null);

export const getCachedWeatherData = (lat: number, lng: number, units: Units): WeatherState | null => {
  const cacheKey: WeatherCacheKey = `weather_${lat}_${lng}_${units}`;
  const cachedData = getFromLocalStorage<{ data: WeatherState; timestamp: number } | null>(cacheKey, null);

  if (cachedData) {
    const cacheAge = Date.now() - cachedData.timestamp;
    if (cacheAge < 30 * 60 * 1000) { // 30 minutes
      return cachedData.data;
    }
  }

  return null;
};