"use client";

import clsx from "clsx";
import { useCallback, useEffect } from "react";
import LeftPanel from "./leftPanel";
import { useWeather } from "./hooks/useWeather";

export default function Home() {
  const { weather, address, isLoading, error, units, setUnits, getWeather } = useWeather();

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

  useEffect(() => {
    // Attempt to get user's location on initial load
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
        (error) => {
          getWeather(40.7128, -74.0060, "New York City, NY");
        }
      );
    } else {
      getWeather(40.7128, -74.0060, "New York City, NY");
    }
  }, [getWeather]);

  return (
    <div className={clsx("min-h-screen min-w-screen flex")}>
      <div className="flex-1 md:h-screen">
      <LeftPanel weatherData={weather} units={units} address={address || ''} isLoading={isLoading} error={error} />

      </div>
    </div>
  );
  }