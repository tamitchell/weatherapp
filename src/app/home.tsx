"use client";

import clsx from "clsx";
import LeftPanel from "./leftPanel";
import { useWeather } from "./hooks/useWeather";
import WeeklyForecast from "./weeklyForecast";

export default function Home() {
  const { weather, forecast, address, isLoading, error, units } = useWeather();


  return (
    <div className={clsx("min-h-screen min-w-screen flex")}>
      <div className="w-full md:w-1/4 md:max-w-[25vw] md:min-h-screen">
      <LeftPanel weatherData={weather} units={units} address={address || ''} isLoading={isLoading} error={error} />
      </div>
      <div className="w-full md:w-3/4 md:min-h-screen overflow-y-auto">
        {weather && forecast && <WeeklyForecast units={units} forecast={forecast} />} {/* We'll need to update this with actual weekly forecast data */}
      </div>
    </div>
  );
  }