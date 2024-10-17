import { createContext, ReactNode, useCallback, useEffect, useMemo, useReducer } from "react";
import { AirQualityResponse, ForecastData, WeatherCacheKey, WeatherContextProps, WeatherData, WeatherState } from "../types/types";
import { DEFAULT_NY_LAT, DEFAULT_NY_LNG, DEFAULT_ADDRESS } from "../data/defaultData";
import { getCachedWeatherData, getLastLocationFromLocalStorage, getUnitsFromLocalStorage } from "src/util/localStorageUtil";
import { weatherReducer } from "src/reducers/weatherReducer";
import setToLocalStorage from "src/util/setToLocalStorage/setToLocalStorage";


export const WeatherContext = createContext<WeatherContextProps | undefined>(undefined);

// Define initial state
const initialState: WeatherState = {
  weather: null,
  forecast: [],
  airQuality: null,
  address: null,
  isLoading: true,
  error: null,
  units: 'imperial',
};


export const WeatherProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(weatherReducer, initialState);

  const baseUrl = useMemo(() => {
    return process.env.NEXT_PUBLIC_VERCEL_URL ?? 'http://localhost:3000';
  }, []);

  // Store user's unit preference in localStorage when it changes
  useEffect(() => {
    const storedUnits = getUnitsFromLocalStorage();
    dispatch({ type: 'SET_UNITS', payload: storedUnits });
  }, []);

  const isCountryUS = useCallback((lat: number, lng: number): boolean => {
    // Rough bounding box for the continental US (could be refined)
    const usBounds = {
      north: 49.38,
      south: 24.52,
      west: -125.0,
      east: -66.93,
    };

    return (
      lat >= usBounds.south &&
      lat <= usBounds.north &&
      lng >= usBounds.west &&
      lng <= usBounds.east
    );
  }, []);

  const requestGeolocation = useCallback((): Promise<GeolocationPosition> => {
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error('Geolocation request timed out'));
      }, 10000); // 10-second timeout for geolocation
  
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          clearTimeout(timeout); // Clear timeout when geolocation succeeds
          resolve(position);
        },
        (error) => {
          clearTimeout(timeout); // Clear timeout if geolocation fails
          reject(error); // Reject with the geolocation error
        }
      );
    });
  }, []);

  const getWeather = useCallback(async (lat: number, lng: number, locationAddress: string) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'CLEAR_ERROR', payload: "general" });

    const cacheKey: WeatherCacheKey = `weather_${lat}_${lng}_${state.units}`;
    const cachedData = getCachedWeatherData(lat, lng, state.units);

    
    if (cachedData && cachedData.timestamp && Date.now() - cachedData.timestamp < 30 * 60 * 1000) {
      dispatch({ type: 'SET_WEATHER', payload: cachedData.weather });
      dispatch({ type: 'SET_FORECAST', payload: cachedData.forecast });
      dispatch({ type: 'SET_AIR_QUALITY', payload: cachedData.airQuality });
      dispatch({ type: 'SET_ADDRESS', payload: cachedData.address });
      dispatch({ type: 'SET_TIMESTAMP', payload: cachedData.timestamp });
      dispatch({ type: 'SET_LOADING', payload: false });
      return;
    }

    try { 
      const [weatherRes, forecastRes, airQualityRes] = await Promise.all([
        fetch(`${baseUrl}/api/weather?lat=${lat}&lng=${lng}&units=${state.units}`),
        fetch(`${baseUrl}/api/weather/forecast?lat=${lat}&lng=${lng}&units=${state.units}`),
        fetch(`${baseUrl}/api/weather/air_pollution?lat=${lat}&lng=${lng}&units=${state.units}`),
      ]);

      const newState: Partial<WeatherState> = {};

      if (weatherRes.ok) {
        const weather: WeatherData = await weatherRes.json();
        dispatch({ type: 'SET_WEATHER', payload: weather });
        newState.weather = weather;
      } else {
        dispatch({ type: 'SET_ERROR', payload: { type: 'weather', message: 'Failed to fetch weather data' } });
      }
  
      if (forecastRes.ok) {
        const forecastData: ForecastData = await forecastRes.json();
        dispatch({ type: 'SET_FORECAST', payload: forecastData.list });
        newState.forecast = forecastData.list;
      } else {
        dispatch({ type: 'SET_ERROR', payload: { type: 'forecast', message: 'Failed to fetch forecast data' } });
      }
  
      if (airQualityRes.ok) {
        const airQuality: AirQualityResponse = await airQualityRes.json();
        newState.airQuality = airQuality;
        dispatch({ type: 'SET_AIR_QUALITY', payload: airQuality });
      } else {
        dispatch({ type: 'SET_ERROR', payload: { type: 'airQuality', message: 'Failed to fetch air quality data' } });
      }
  
      dispatch({ type: 'SET_ADDRESS', payload: locationAddress });
      newState.address = locationAddress;

      const timestamp = Date.now();
      dispatch({ type: 'SET_TIMESTAMP', payload: timestamp });
      newState.timestamp = timestamp;



      // Cache the new data
      if (Object.keys(newState).length) {
        setToLocalStorage(cacheKey, newState);
      }

      // Save the last location
      setToLocalStorage('lastLocation', { lat, lng, address: locationAddress });
    } catch (error) {
      console.error('Error fetching weather:', error);
      dispatch({ type: 'SET_ERROR', payload: {type: "general", message: 'Failed to fetch weather data. Showing default location.'} });
      // Fallback to New York if there's an error
      getWeather(DEFAULT_NY_LAT, DEFAULT_NY_LNG, DEFAULT_ADDRESS);
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, [state.units, baseUrl]);
  

  useEffect(() => {
    const fetchWeatherData = async () => {
      const lastLocation = getLastLocationFromLocalStorage();
      if (lastLocation) {
        await getWeather(lastLocation.lat, lastLocation.lng, lastLocation.address);
      } else {
        try {
          const position: GeolocationPosition = await requestGeolocation();
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          await getWeather(lat, lng, "Your Location");
        } catch (error) {
          console.error("Error fetching geolocation:", error);
          // Fallback to New York if geolocation fails or times out
          await getWeather(DEFAULT_NY_LAT, DEFAULT_NY_LNG, DEFAULT_ADDRESS);
        }
      }
    };
  
    fetchWeatherData();
  }, [isCountryUS, requestGeolocation, getWeather]);

  return (
    <WeatherContext.Provider value={{ state, dispatch, getWeather }}>
      {children}
    </WeatherContext.Provider>
  );
};
