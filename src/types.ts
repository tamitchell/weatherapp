import { FormEvent } from "react";

export type WeatherData = {
  current: {
    temp: number;
    feels_like: number;
    humidity: number;
    uvi: number;
    wind_speed: number;
    weather: Array<{
      description: string;
      icon: string;
    }>;
  };
  daily: Array<{
    temp: {
      day: number;
      min: number;
      max: number;
    };
    weather: Array<{
      description: string;
      icon: string;
    }>;
    pop: number; // Probability of precipitation
  }>;
  };

  export type WeatherProps = {
    data: WeatherData | null;
    address: string;
  };
  
 export type SearchProps = {
    getLatLng: (e: FormEvent, input: string) => Promise<void>;
  };

  export type Result = {
    formatted_address: string;
    location: {
      lat: number;
      lng: number;
    };
  };
  

  export type LocationProps = {
    results: Result[];
    getWeather: (lat: number, lng: number, address: string) => Promise<void>;
  };
  

  export type HomeProps = {
    initialWeather: WeatherData | null;
    initialAddress: string;
  };