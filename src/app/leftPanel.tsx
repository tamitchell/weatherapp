"use client";
import { Units, WeatherData } from "@/types";
import Search from "./search";
import clsx from "clsx";
import { baseStyles, textStyles } from "@/app/styles/styles";

interface LeftPanelProps {
    weatherData: WeatherData | null;
    units: Units;
    address: string;
    isLoading: boolean;
    error: string | null;
  }

  export default function LeftPanel({ weatherData, units, address }: LeftPanelProps) {

    console.log("weather data", weatherData);

      return   <div className="bg-white border-2 p-6 w-full h-full border-2 border-charcoal max-w-md flex flex-col">
      <h1 className="text-2xl font-bold mb-4 text-black">FIRST CALL WEATHER</h1>
      
      <Search />
      
      {weatherData && (
        <>
          <div className="bg-black text-white p-4 rounded-lg mb-4">
            <h2 className="text-xl font-semibold">{address}</h2>
          </div>

          <p className="text-lg mb-4 text-charcoal">{weatherData.name}</p>

          <div className="text-center mb-6">
            <span className={clsx(textStyles.largeTemp, "text-black")}>
              {Math.round(weatherData.main.temp)}{units === "imperial" ? "°F" : "°C"}
            </span>
          </div>

          <div className={clsx(baseStyles.flexRow, "justify-between text-sm text-charcoal")}>
            <div>
              <p className="font-semibold">Chance of Rain</p>
              <p>{weatherData.clouds.all}%</p>
            </div>
            <div>
              <p className="font-semibold">Humidity</p>
              <p>{weatherData.main.humidity}%</p>
            </div>
            <div>
              <p className="font-semibold">Wind Speed</p>
              <p>{Math.round(weatherData.wind.speed)} mph</p>
            </div>
          </div>
        </>
      )}
    </div>
  }