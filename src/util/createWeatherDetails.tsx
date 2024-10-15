import ChanceOfRain from "../icons/ChanceOfRain";
import Humidity from "../icons/Humidity";
import Icon from "../icons/Icon";
import { AirQualityDescription, Units } from "../types/types";
import formatVisibility from "./formatVisibility";

interface WeatherCardDetail {
    title: string;
    icon: React.ReactNode;
    value: string;
  }
  
  interface WeatherMetrics {
    chanceOfRain: number | null;
    humidity: number;
    windSpeed: number;
    visibility: number;
    pressure: number;
    airQuality: AirQualityDescription;
    units: Units;
  }

export const createWeatherDetails = ({chanceOfRain, humidity, windSpeed, visibility, pressure, airQuality, units}: WeatherMetrics): ReadonlyArray<WeatherCardDetail> => Object.freeze([
    {
      title: "% of Rain",
      icon: <ChanceOfRain size={24} />,
      value: chanceOfRain ? `${chanceOfRain}%` : "None"
    },
    {
      title: "Humidity",
      icon: <Humidity size={24} />,
      value: `${humidity}%`
    },
    {
      title: "Wind Speed",
      icon: <Icon name="wind_speed" fill="transparent" size={24} />,
      value: `${Math.round(windSpeed)} ${units === "imperial" ? "mph" : "m/s"}`
    },
    {
      title: "Visibility",
      icon: <Icon name="visibility" size={24} />,
      value: `${formatVisibility(visibility, units)}`
    },
    {
      title: "Pressure",
      icon: <Icon name="pressure" size={24} />,
      value: `${pressure} ${units === "imperial" ? "inHg" : "hPa"}`
    },
    {
      title: "Air Quality",
      icon: <Icon name="air_quality" fill="black" stroke="transparent" size={24} />,
      value: `${airQuality}`
    }
  ]);