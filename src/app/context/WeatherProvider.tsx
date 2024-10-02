import { Units, WeatherData } from "@/types";
import { createContext, ReactNode, useCallback, useEffect, useState } from "react";
import { DEFAULT_NY_LAT, DEFAULT_NY_LNG, DEFAULT_ADDRESS } from "../defaultData";

interface WeatherContextProps {
  weather: WeatherData | null;
  address: string | null;
  isLoading: boolean;
  error: string | null;
  getWeather: (lat: number, lng: number, locationAddress: string) => Promise<void>;
  units: Units;
  setUnits: (units: Units) => void;

}


export const WeatherContext = createContext<WeatherContextProps | undefined>(undefined);

export const WeatherProvider = ({ children }: { children: ReactNode }) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [units, setUnits] = useState<Units>((): Units => {
    //Check the localStorage for units preference
    const storedUnits = localStorage.getItem('weatherUnits') as Units;
    return storedUnits || 'imperial'; // default to imperial because default location is NY
  });

  // Store user's unit preference in localStorage when it changes
  useEffect(() => {
    localStorage.setItem('weatherUnits', units);
  }, [units]);

  const getWeather = useCallback(async (lat: number, lng: number, locationAddress: string): Promise<void> => {
    setIsLoading(true);
    setError(null);
    const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000';
    try {
      const res = await fetch(`${baseUrl}/api/weather?lat=${lat}&lng=${lng}&units=${units}`);
      if (!res.ok) {
        throw new Error(`Weather API responded with status: ${res.status}`);
      }
      const json: WeatherData = await res.json();
      setWeather(json);
      setAddress(locationAddress);
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
  }, [units]);

  return (
    <WeatherContext.Provider value={{ weather, address, isLoading, units, setUnits, error, getWeather }}>
      {children}
    </WeatherContext.Provider>
  );
};
