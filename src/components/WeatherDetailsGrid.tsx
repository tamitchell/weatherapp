import clsx from "clsx";
import { Units, AirQualityDescription } from "../types/types";
import { createWeatherDetails } from "../util/createWeatherDetails";

interface WeatherDetailsGridProps {
    chanceOfRain: number | null;
    humidity: number;
    windSpeed: number;
    visibility: number;
    pressure: number;
    airQuality: AirQualityDescription;
    units: Units;
  }

  export default function WeatherDetailsGrid({chanceOfRain, humidity, windSpeed, visibility, pressure, airQuality, units}: WeatherDetailsGridProps): JSX.Element {
    return (
        <div className="grid grid-cols-3 gap-2 w-full text-charcoal">
          {createWeatherDetails({chanceOfRain, humidity, windSpeed, visibility, pressure, airQuality, units}).map((detail, index) => (
            <div key={index} className={clsx(
              "bg-white rounded-lg border-2 border-black",
              "flex flex-col items-center justify-between",
              "p-[clamp(0.5rem,2vw,1rem)]",
              "h-[clamp(120px,25vw,160px)]"
            )}>
              <div className="font-bold text-gray-900 text-[clamp(1.5rem,4vw,2.25rem)] text-center">
                {detail.icon}
              </div>
              <div className="font-bold text-gray-900 text-[clamp(1rem,0.4vw+0.9rem,1.25rem)] text-center">
                {detail.value}
              </div>
              <div className="text-black text-sm text-center">
                {detail.title}
              </div>
            </div>
          ))}
        </div>
      );
  }