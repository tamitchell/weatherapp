"use client";

import clsx from "clsx";
import LeftPanel from "./leftPanel";
import { useWeather } from "./hooks/useWeather";
import WeeklyForecast from "./weeklyForecast";
import { useMemo } from "react";
import getAirQualityDescription from "./util/getAQIDescription";

export default function Home() {
  const { weather, forecast, airQuality, address, isLoading, error, units, setUnits } = useWeather();

  const airQualityIndex = useMemo(() => getAirQualityDescription(airQuality?.list[0].main.aqi || 0), [airQuality])

  return (
    <div className={clsx(
      "min-h-screen w-full",
      "flex flex-col sm:flex-row",
    )}>
      <div className={clsx(
        "w-full min-w-[320px]",
        "sm:w-1/2 md:w-1/3",
        "sm:max-w-[425px]",
        "md:max-w-[30vw]",
        "md:min-h-screen"
      )}>
    <LeftPanel weatherData={weather} airQuality={airQualityIndex} setUnits={setUnits} units={units} address={address || ''} isLoading={isLoading} error={error} />
      </div>
      <div className={clsx(
        "w-full",
        "sm:flex-1",
        "md:min-h-screen", 
        "overflow-y-auto"
      )}>
        {weather && forecast && <WeeklyForecast units={units} forecast={forecast} />} {/* We'll need to update this with actual weekly forecast data */}
      </div>
    </div>
  );
  }