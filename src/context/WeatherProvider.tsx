import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
} from 'react';
import {
  WeatherCacheKey,
  WeatherContextProps,
  WeatherState,
} from '../types/types';
import {
  DEFAULT_NY_LAT,
  DEFAULT_NY_LNG,
  DEFAULT_ADDRESS,
} from '../data/defaultData';
import {
  getCachedWeatherData,
  getLastLocationFromLocalStorage,
  getUnitsFromLocalStorage,
} from 'src/util/localStorageUtil';
import { weatherReducer } from 'src/reducers/weatherReducer';
import setToLocalStorage from 'src/util/setToLocalStorage/setToLocalStorage';
import { useSnackbar } from 'notistack';
import { requestGeolocation } from 'src/util/requestGeolocation/requestGeolocation';
import { getWeather } from 'src/util/getWeather/getWeather';

export const WeatherContext = createContext<WeatherContextProps | undefined>(
  undefined
);

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
  const { enqueueSnackbar } = useSnackbar();

  // Store user's unit preference in localStorage when it changes
  useEffect(() => {
    const storedUnits = getUnitsFromLocalStorage();
    dispatch({ type: 'SET_UNITS', payload: storedUnits });
  }, []);

  const fetchWeatherData = useCallback(
    async (lat: number, lng: number, locationAddress: string) => {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'CLEAR_ERROR', payload: 'general' });

      const cacheKey: WeatherCacheKey = `weather_${lat}_${lng}_${state.units}`;
      const cachedData = getCachedWeatherData(lat, lng, state.units);

      if (
        cachedData &&
        cachedData.timestamp &&
        Date.now() - cachedData.timestamp < 30 * 60 * 1000
      ) {
        dispatch({ type: 'SET_WEATHER', payload: cachedData.weather });
        dispatch({ type: 'SET_FORECAST', payload: cachedData.forecast });
        dispatch({ type: 'SET_AIR_QUALITY', payload: cachedData.airQuality });
        dispatch({ type: 'SET_ADDRESS', payload: cachedData.address });
        dispatch({ type: 'SET_TIMESTAMP', payload: cachedData.timestamp });
        dispatch({ type: 'SET_LOADING', payload: false });
        return;
      }

      try {
        const { weather, forecast, airQuality } = await getWeather(
          lat,
          lng,
          state.units
        );
        const timestamp = Date.now();
        const newState: Partial<WeatherState> = {
          weather,
          forecast,
          airQuality,
          address: locationAddress,
          timestamp,
        };

        dispatch({ type: 'SET_WEATHER', payload: weather });
        dispatch({ type: 'SET_FORECAST', payload: forecast });
        dispatch({ type: 'SET_AIR_QUALITY', payload: airQuality });
        dispatch({ type: 'SET_ADDRESS', payload: locationAddress });
        dispatch({ type: 'SET_TIMESTAMP', payload: timestamp });

        // Cache the new data
        setToLocalStorage(cacheKey, newState);

        // Save the last location
        setToLocalStorage('lastLocation', {
          lat,
          lng,
          address: locationAddress,
        });
      } catch (error) {
        console.error('Error fetching weather:', error);
        dispatch({
          type: 'SET_ERROR',
          payload: {
            type: 'general',
            message: 'Failed to fetch weather data. Showing default location.',
          },
        });
        // Fallback to New York if there's an error
        fetchWeatherData(DEFAULT_NY_LAT, DEFAULT_NY_LNG, DEFAULT_ADDRESS);
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    },
    [state.units]
  );

  useEffect(() => {
    if (state.error?.airQuality) {
      enqueueSnackbar('Air Quality Data unavailable.', { variant: 'error' });
    }
    if (state.error?.forecast) {
      enqueueSnackbar('5-day forecast unavailable.', { variant: 'error' });
    }

    if (state.error?.general) {
      enqueueSnackbar('An unknown error has occurred.', { variant: 'error' });
    }
    if (state.error?.weather) {
      enqueueSnackbar(
        'Weather data is unavailable. Showing default location.',
        { variant: 'error' }
      );
    }
  }, [state.error, enqueueSnackbar]);

  useEffect(() => {
    const initWeatherData = async () => {
      const lastLocation = getLastLocationFromLocalStorage();
      if (lastLocation) {
        await fetchWeatherData(
          lastLocation.lat,
          lastLocation.lng,
          lastLocation.address
        );
      } else {
        try {
          const position = await requestGeolocation();
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          await fetchWeatherData(lat, lng, 'Your Location');
        } catch (error) {
          console.error('Error fetching geolocation:', error);
          enqueueSnackbar(
            'Failed to retrieve your location. Showing default weather for New York.',
            { variant: 'error' }
          );
          await fetchWeatherData(
            DEFAULT_NY_LAT,
            DEFAULT_NY_LNG,
            DEFAULT_ADDRESS
          );
        }
      }
    };

    initWeatherData();
  }, [fetchWeatherData, enqueueSnackbar]);

  const contextValue = useMemo(
    () => ({
      state,
      dispatch,
      getWeather: fetchWeatherData,
    }),
    [state, fetchWeatherData]
  );

  return (
    <WeatherContext.Provider value={contextValue}>
      {children}
    </WeatherContext.Provider>
  );
};
