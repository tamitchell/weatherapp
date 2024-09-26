"use client";
import { WeatherData } from "@/types";
import Search from "./search";
import clsx from "clsx";
import { baseStyles, textStyles } from "@/app/styles/styles";

interface LeftPanelProps {
    weatherData: WeatherData | null;
    address: string;
    isLoading: boolean;
    error: string | null;
  }

  export default function LeftPanel({ weatherData, address }: LeftPanelProps) {

      return   <div className="bg-white border-2 p-6 w-full h-full max-w-md flex flex-col">
      <h1 className="text-2xl font-bold mb-4 text-black">FIRST CALL WEATHER</h1>
      
      <Search />
      
      {weatherData && (
        <>
          <div className="bg-black text-white p-4 rounded-lg mb-4">
            <h2 className="text-xl font-semibold">{address}</h2>
          </div>

          <p className="text-lg mb-4">{weatherData.weather[0].description}</p>

          <div className="text-center mb-6">
            <span className={clsx(textStyles.largeTemp, "text-black")}>
              {Math.round(weatherData.main.temp - 273.15)}°F
            </span>
          </div>

          <div className={clsx(baseStyles.flexRow, "justify-between text-sm")}>
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