"use client";

import { WeatherData } from "@/types";
import clsx from "clsx";
import { useState,  useEffect, useCallback } from "react";
import LeftPanel from "./leftPanel";

const DEFAULT_LAT = 40.7128; // New York City latitude
const DEFAULT_LNG = -74.0060; // New York City longitude
const DEFAULT_ADDRESS = "New York City, NY";

export default function Home() {
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [address, setAddress] = useState<string | null>();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const getWeather = useCallback(async (lat: number, lng: number, locationAddress: string): Promise<void> => {
        setIsLoading(true);
        setError(null);
        const baseUrl = process.env.VERCEL_URL
          ? `https://${process.env.VERCEL_URL}`
          : 'http://localhost:3000';
        try {
          const res = await fetch(`${baseUrl}/api/weather?lat=${lat}&lng=${lng}`);
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
          if (lat !== DEFAULT_LAT || lng !== DEFAULT_LNG) {
            getWeather(DEFAULT_LAT, DEFAULT_LNG, DEFAULT_ADDRESS);
          }
        } finally {
          setIsLoading(false);
        }
      }, []);
  
    useEffect(() => {
        // Attempt to get user's location on initial load
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              getWeather(position.coords.latitude, position.coords.longitude, "Your Location");
            },
            (error) => {
              console.error("Error getting user location:", error);
              getWeather(DEFAULT_LAT, DEFAULT_LNG, DEFAULT_ADDRESS);
            }
          );
        } else {
          getWeather(DEFAULT_LAT, DEFAULT_LNG, DEFAULT_ADDRESS);
        }
      }, [getWeather]);
  

    return (
      <div className={clsx("border-2 min-h-screen min-w-screen flex")}>
        <LeftPanel  
        weatherData={weather}
        address={address || ''}
        isLoading={isLoading}
        error={error} />
      </div>
    );
  }