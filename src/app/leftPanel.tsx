"use client";
import { AirQualityDescription, Units, WeatherData } from "@/app/types";
import Search from "./search";
import clsx from "clsx";
import { baseStyles } from "@/app/styles/styles";
import { SkeletonLeftPanelLoader } from "./skeletalLeftPanel";
import Logo from "./icons/Logo";
import DateDisplay from "./dateDisplay";
import { useCallback } from "react";
import UnitsToggle from "./UnitsToggle";
import WeatherDetailsGrid from "./WeatherDetailsGrid";
import WeatherSummary from "./WeatherSummary";

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
      <p className="text-red-500">{error}</p>
    ) : weatherData && (
      <>
        <DateDisplay />

        <WeatherSummary name={weatherData.name} description={weatherData.weather[0].description} mainTemp={weatherData.main.temp} feelsLike={weatherData.main.feels_like} units={units} />
        <WeatherDetailsGrid
          chanceOfRain={weatherData.clouds.all}
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