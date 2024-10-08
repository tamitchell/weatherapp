"use client";
import Search from "./Search";
import clsx from "clsx";
import { SkeletonLeftPanelLoader } from "./SkeletalLeftPanel";
import Logo from "../icons/Logo";
import DateDisplay from "./DateDisplay";
import { useCallback } from "react";
import UnitsToggle from "./UnitsToggle";
import WeatherDetailsGrid from "./WeatherDetailsGrid";
import WeatherSummary from "./WeatherSummary";
import calculateRainProbability from "../util/calculateChanceOfPrecip";
import { baseStyles } from "../styles/styles";
import { WeatherData, AirQualityDescription, Units } from "../types/types";
import LeftPanelErrorState from "./LeftPanelErrorState";

interface LeftPanelProps {
  weatherData: WeatherData | null;
  airQuality: AirQualityDescription;
  units: Units;
  setUnits: (units: Units) => void
  address: string;
  isLoading: boolean;
  error: string | null;
}

export default function LeftPanel({ weatherData, units, airQuality, setUnits, isLoading, error }: LeftPanelProps) {
  const handleUnitChange = useCallback(() => {
    setUnits(units === 'imperial' ? 'metric' : 'imperial');
  }, [units, setUnits]);
  return <div className="bg-white p-4 w-full h-full flex flex-col">
    <div className={clsx("flex items-center justify-start space-between flex-wrap", "w-full text-black h-[3.5em]")}>
      <Logo width={250} height={18} />
      <UnitsToggle units={units} onToggle={handleUnitChange} />
    </div>
    <div className={clsx(baseStyles.flexCenter, "w-full text-black h-[3.5em]")}>      <Search />
    </div>

    {isLoading ? (
      <SkeletonLeftPanelLoader />
    ) : error ? (
      <LeftPanelErrorState />
    ) : weatherData && (
      <>
        <DateDisplay />

        <WeatherSummary name={weatherData.name} description={weatherData.weather[0].description} mainTemp={weatherData.main.temp} feelsLike={weatherData.main.feels_like} units={units} />
        <WeatherDetailsGrid
          chanceOfRain={calculateRainProbability(weatherData)}
          humidity={weatherData.main.humidity}
          windSpeed={weatherData.wind.speed}
          visibility={weatherData.visibility}
          pressure={weatherData.main.pressure}
          airQuality={airQuality}
          units={units}
        />
      </>
    )}
  </div>
}