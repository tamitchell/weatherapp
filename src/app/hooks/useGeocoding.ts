import { GeocodeResult } from "@/types";
import { useState } from "react";

export function useGeocoding() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
  
    const getLatLng = async (input: string): Promise<GeocodeResult | null> => {
      setIsLoading(true);
      setError(null);
  
      const key = process.env.NEXT_PUBLIC_GEOCODIO_API_KEY;
      const url = `https://api.geocod.io/v1.3/geocode?q=${encodeURIComponent(input)}&api_key=${key}`;
  
      try {
        const res = await fetch(url);
        const json = await res.json();
  
        if (json.results && json.results.length > 0) {
          const { lat, lng } = json.results[0].location;
          const { formatted_address } = json.results[0];
          return { lat, lng, formatted_address };
        } else {
          setError('No results found');
          return null;
        }
      } catch (error) {
        console.error("Error fetching location:", error);
        setError('Failed to fetch location data');
        return null;
      } finally {
        setIsLoading(false);
      }
    };
  
    return { getLatLng, isLoading, error };
  }