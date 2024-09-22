"use client";
import { HomeProps, WeatherData, Result } from "@/types";
import clsx from "clsx";
import { useState, FormEvent, useEffect } from "react";
import Search from "./search";
import Weather from "./weather";
import Location from "./location";


export default function ClientSideHome({ initialWeather, initialAddress }: HomeProps) {
    const [weather, setWeather] = useState<WeatherData | null>(initialWeather);
    const [address, setAddress] = useState<string>(initialAddress);
    const [results, setResults] = useState<Result[]>([]);
  
    const getLatLng = async (e: FormEvent, input: string): Promise<void> => {
      e.preventDefault();
      const key = process.env.NEXT_PUBLIC_GEOCODIO_API_KEY;
      const url = `https://api.geocod.io/v1.3/geocode?q=${input}&api_key=${key}`;
      try {
        const res = await fetch(url);
        const json = await res.json();
        setResults(json.results || []);
      } catch (error) {
        console.error("Error fetching location:", error);
      }
    };
  
    const getWeather = async (lat: number, lng: number, address: string): Promise<void> => {
      const url = `/api/weather?lat=${lat}&lng=${lng}`;
      try {
        const res = await fetch(url);
        const json = await res.json();
        setWeather(json);
        setAddress(address);
      } catch (error) {
        console.error("Error fetching weather:", error);
      }
    };
  
    useEffect(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            getWeather(position.coords.latitude, position.coords.longitude, "Your Location");
          },
          (error) => {
            console.error("Error getting user location:", error);
          }
        );
      }
    }, []);
  
    return (
      <div className={clsx("border-2 min-h-screen flex flex-col")}>
        <Search getLatLng={getLatLng} />
        <Location results={results} getWeather={getWeather} />
        <Weather data={weather} address={address} />
      </div>
    );
  }
  