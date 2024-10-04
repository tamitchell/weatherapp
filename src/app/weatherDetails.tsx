import { Units, WeatherData } from "@/types";
import ChanceOfRain from "./icons/ChanceOfRain";
import Humidity from "./icons/Humidity";
import WindSpeed from "./icons/WindSpeed";

interface WeatherDetail {
    title: string;
    icon: React.ReactNode;
    value: string;
  }
  
export const createWeatherDetails = (weatherData: WeatherData, units: Units): ReadonlyArray<WeatherDetail> => Object.freeze([
    {
      title: "Chance of Rain",
      icon: <ChanceOfRain size={28} />,
      value: `${weatherData.clouds?.all}%`
    },
    {
      title: "Humidity",
      icon: <Humidity size={28} />,
      value: `${weatherData.main?.humidity}%`
    },
    {
      title: "Wind Speed",
      icon: <WindSpeed size={28} />,
      value: `${Math.round(weatherData.wind?.speed)} ${units === "imperial" ? "mph" : "km/h"}`
    }
  ]);