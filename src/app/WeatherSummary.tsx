import clsx from "clsx";
import { Units } from "./types";

interface WeatherSummaryProps {
    name: string;
    mainTemp: number;
    feelsLike: number;
    description: string;
    units: Units;
  }

  export default function WeatherSummary({name, mainTemp, feelsLike, description, units}: WeatherSummaryProps): JSX.Element {
    return (
        <div className="text-charcoal">
          <p className="text-lg mb-4">{name}</p>
          <div className="text-center mb-6 text-black flex flex-col gap-2">
            <span className={clsx("text-[clamp(2rem,8vw,6rem)]", "text-black font-bold")}>
              {Math.round(mainTemp)}
              {units === "imperial" ? "°F" : "°C"}
            </span>
            <span className="text-sm italic">
              feels like {Math.round(feelsLike)} 
              {units === "imperial" ? "°F" : "°C"}
            </span>
            <span className="capitalize">
              {description}
            </span>
          </div>
        </div>
      );
    
  }