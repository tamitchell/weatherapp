import { ForecastData, ForecastItem, LastLocation, Units, WeatherContextProps, WeatherData } from "@/types";
import { createContext, ReactNode, useCallback, useEffect, useState } from "react";
import { DEFAULT_NY_LAT, DEFAULT_NY_LNG, DEFAULT_ADDRESS } from "../defaultData";


export const WeatherContext = createContext<WeatherContextProps | undefined>(undefined);


export const WeatherProvider = ({ children }: { children: ReactNode }) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastItem[] | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [units, setUnits] = useState<Units>('imperial'); // default value

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUnits = window.localStorage.getItem('weatherUnits') as Units;
      if (storedUnits) {
        setUnits(storedUnits);
      }
    }
  }, []);

  const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000';


  // Store user's unit preference in localStorage when it changes
  useEffect(() => {
    window.localStorage.setItem('weatherUnits', units);
  }, [units]);

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
  }, [])

  // Filtering the forecast data based on the user's current time
  const filterForecastByUserTime = (forecastData: ForecastData): ForecastItem[] => {
    const currentTime = new Date(); // User's current local time
    const currentHour = currentTime.getHours(); // Current hour in user's timezone

    return forecastData.list.filter(entry => {
      const forecastTimeUTC = new Date(entry.dt * 1000); // Convert UNIX timestamp to Date in UTC
      const forecastLocalTime = new Date(forecastTimeUTC.getTime() + forecastTimeUTC.getTimezoneOffset() * 60000); // Convert UTC to local time

      // Match forecast entries that are close to the user's current hour (e.g., within a 3-hour range)
      return Math.abs(forecastLocalTime.getHours() - currentHour) <= 3;
    });
  };

  const getWeather = useCallback(async (lat: number, lng: number, locationAddress: string): Promise<void> => {
    setIsLoading(true);
    setError(null);

    const cacheKey = `weather_${lat}_${lng}_${units}`;
    const cachedData = window.localStorage.getItem(cacheKey);

    if (cachedData) {
      const { data, timestamp } = JSON.parse(cachedData);
      const cacheAge = Date.now() - timestamp;

      // Use cached data if it's less than 30 minutes old
      if (cacheAge < 30 * 60 * 1000) {
        setWeather(data.weather);
        setForecast(filterForecastByUserTime(data.forecast));
        setAddress(locationAddress);
        setIsLoading(false);
        return;
      }
    }


    try {
      const weatherRes = await fetch(`${baseUrl}/api/weather?lat=${lat}&lng=${lng}&units=${units}`);
      if (!weatherRes.ok) {
        throw new Error(`Weather API responded with status: ${weatherRes.status}`);
      }
      const weatherJson: WeatherData = await weatherRes.json();


      const forecastRes = await fetch(`${baseUrl}/api/weather/forecast?lat=${lat}&lng=${lng}&units=${units}`);
      if (!forecastRes.ok) {
        throw new Error(`Forecast API responded with status: ${forecastRes.status}`);
      }
      const forecastJson: ForecastData = await forecastRes.json();

      console.log("weather json", weatherJson);

      if (isCountryUS(lat, lng)) { setUnits("imperial") } else { setUnits("metric") }

      // Set weather and forecast state
      setWeather(weatherJson);
      setForecast(filterForecastByUserTime(forecastJson));
      setAddress(locationAddress);

      // Cache the new data
      window.localStorage.setItem(cacheKey, JSON.stringify({
        data: { weather: weatherJson, forecast: forecastJson },
        timestamp: Date.now(),
      }));

      // Save the last location
      const lastLocation: LastLocation = { lat, lng, address: locationAddress };
      window.localStorage.setItem('lastLocation', JSON.stringify(lastLocation));
    } catch (error) {
      console.error("Error fetching weather:", error);
      setError("Failed to fetch weather data. Showing default location.");
      // Fallback to New York if there's an error
      if (lat !== DEFAULT_NY_LAT || lng !== DEFAULT_NY_LNG) {
        getWeather(DEFAULT_NY_LAT, DEFAULT_NY_LNG, DEFAULT_ADDRESS);
      }
    } finally {
      setIsLoading(false);
    }
  }, [isCountryUS, baseUrl, units]);

  useEffect(() => {
    const lastLocationString = window.localStorage.getItem('lastLocation');
    if (lastLocationString) {
      const lastLocation: LastLocation = JSON.parse(lastLocationString);
      getWeather(lastLocation.lat, lastLocation.lng, lastLocation.address);
    } else {
      // If no last location, use geolocation or default to New York
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            if (isCountryUS(lat, lng)) {
              setUnits('imperial');
            } else {
              setUnits('metric');
            }
            getWeather(lat, lng, "Your Location");
          },
          () => getWeather(DEFAULT_NY_LAT, DEFAULT_NY_LNG, DEFAULT_ADDRESS)
        );
      } else {
        getWeather(DEFAULT_NY_LAT, DEFAULT_NY_LNG, DEFAULT_ADDRESS);
      }
    }
  }, [isCountryUS, getWeather]);

  return (
    <WeatherContext.Provider value={{ weather, forecast, address, isLoading, units, setUnits, error, getWeather }}>
      {children}
    </WeatherContext.Provider>
  );
};
