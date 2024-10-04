"use client";
import { Units, WeatherData } from "@/app/types";
import Search from "./search";
import clsx from "clsx";
import { baseStyles } from "@/app/styles/styles";
import { SkeletonLeftPanelLoader } from "./skeletalLeftPanel";
import { createWeatherDetails } from "./weatherDetails";
import Logo from "./icons/Logo";
import DateDisplay from "./dateDisplay";
import { useCallback } from "react";
import UnitsToggle from "./UnitsToggle";

interface LeftPanelProps {
  weatherData: WeatherData | null;
  units: Units;
  setUnits: (units: Units) => void
  address: string;
  isLoading: boolean;
  error: string | null;
}

export default function LeftPanel({ weatherData, units, setUnits, isLoading, error }: LeftPanelProps) {
  const handleUnitChange = useCallback(() => {
    setUnits(units === 'imperial' ? 'metric' : 'imperial');
  }, [units, setUnits]);
  return <div className="bg-white p-4 w-full h-full flex flex-col">
    <div className={clsx("flex items-center justify-start space-between", "w-full text-black h-[3.5em]")}>
      <Logo width={250} height={18} /> 
      <UnitsToggle units={units} onToggle={handleUnitChange} />
        </div>
    <div className={clsx(baseStyles.flexCenter, "w-full text-black h-[3.5em]")}>      <Search />
    </div>

    {isLoading ? (
      <SkeletonLeftPanelLoader />
    ) : error ? (
      <p className="text-red-500">{error}</p>
    ) : weatherData && (
      <>
        <DateDisplay />

        <p className="text-lg mb-4 text-charcoal">{weatherData.name}</p>

        <div className="text-center mb-6 text-black flex flex-col gap-2 mb-4x">
          <span className={clsx("text-[8vh]", "text-black font-bold")}>
            {Math.round(weatherData.main?.temp)}{units === "imperial" ? "°F" : "°C"}
          </span>
          <span className="text-sm italic">
            feels like {Math.round(weatherData.main.feels_like)} {units === "imperial" ? "°F" : "°C"}
          </span>
          <span className="capitalize">
            {weatherData.weather[0].description}
          </span>
        </div>

        <div className={clsx(baseStyles.flexRow, "justify-between text-sm text-charcoal gap-2")}>
          {createWeatherDetails(weatherData, units).map((detail, index) => (
            <div key={index} className="bg-white rounded-lg border-2 border-black p-2 flex flex-col items-center justify-between space-y-2 w-40">
              <div className="text-3xl text-gray-800">
                {detail.icon}
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {detail.value}
              </div>
              <div className="text-sm text-black">
                {detail.title}
              </div>
            </div>
          ))}
        </div>
      </>
    )}
  </div>
}