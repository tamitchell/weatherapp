"use client";
import Search from "./Search";
import clsx from "clsx";
import { SkeletonLeftPanelLoader } from "./SkeletalLeftPanel";
import Logo from "../icons/Logo";
import DateDisplay from "./DateDisplay/DateDisplay";
import { Dispatch, useCallback } from "react";
import UnitsToggle from "./UnitsToggle";
import WeatherDetailsGrid from "./WeatherDetailsGrid";
import WeatherSummary from "./WeatherSummary/WeatherSummary";
import getPrecipitationForecast from "../util/calculateChanceOfPrecip/getPrecipitationForecast";
import { baseStyles } from "../styles/styles";
import { WeatherData, AirQualityDescription, Units, WeatherAction, ErrorType, ForecastItem } from "../types/types";
import LeftPanelErrorState from "./LeftPanelErrorState";
import TemperatureRange from "./TemperatureRange/TemperatureRange";

interface LeftPanelProps {
  weatherData: WeatherData | null;
  forecast: ForecastItem[];
  airQuality: AirQualityDescription;
  units: Units;
  dispatch: Dispatch<WeatherAction>
  address: string;
  isLoading: boolean;
  error: {
    [key in ErrorType]?: string;
  } | null;
}

export default function LeftPanel({ weatherData, units, airQuality, forecast, dispatch, isLoading, error }: LeftPanelProps) {
  const handleUnitChange = useCallback(() => {
    dispatch({ type: 'SET_UNITS', payload: units === 'imperial' ? 'metric' : 'imperial' });
  }, [units, dispatch]);
  return <div className="bg-white p-4 w-full h-full flex flex-col">
    <div className={clsx("flex items-center justify-start space-between flex-wrap", "w-full text-black h-[3.5em]")}>
      <Logo width={250} height={18} />
      <UnitsToggle units={units} onToggle={handleUnitChange} />
    </div>
    <div className={clsx(baseStyles.flexCenter, "w-full text-black h-[3.5em]")}>      
      <Search />
    </div>

    {isLoading ? (
      <SkeletonLeftPanelLoader />
    ) : error ? (
      <LeftPanelErrorState />
    ) : weatherData && (
      <div className="flex flex-col gap-2">
        <DateDisplay />
        <WeatherSummary cityName={weatherData.name} description={weatherData.weather[0].description} mainTemp={weatherData.main.temp} feelsLike={weatherData.main.feels_like} units={units} />
        <TemperatureRange tempMin={weatherData.main.temp_min} tempMax={weatherData.main.temp_max} units={units} />
        <WeatherDetailsGrid
          chanceOfPrecip={getPrecipitationForecast(forecast)}
          humidity={weatherData.main.humidity}
          windSpeed={weatherData.wind.speed}
          visibility={weatherData.visibility}
          pressure={weatherData.main.pressure}
          airQuality={airQuality}
          units={units}
        />
        {/* <SunPositionDisplay sunrise={weatherData.sys.sunrise} sunset={weatherData.sys.sunset} timezone={weatherData.timezone} /> */}
      </div>
    )}
  </div>
}