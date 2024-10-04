"use client";
import { Units, WeatherData } from "@/types";
import Search from "./search";
import clsx from "clsx";
import { baseStyles, textStyles } from "@/app/styles/styles";
import { SkeletonLeftPanelLoader } from "./skeletalLeftPanel";
import { createWeatherDetails } from "./weatherDetails";
import Logo from "./icons/Logo";

interface LeftPanelProps {
  weatherData: WeatherData | null;
  units: Units;
  address: string;
  isLoading: boolean;
  error: string | null;
}

export default function LeftPanel({ weatherData, units, isLoading, error, address }: LeftPanelProps) {
  return <div className="bg-white p-4 w-full h-full max-w-md flex flex-col">
    <div className={clsx("flex items-center justify-start space-between", "w-full text-black h-[3.5em]")}><Logo width={250} height={18} /> </div>
    <div className={clsx(baseStyles.flexCenter, "w-full text-black h-[3.5em]")}>      <Search />
    </div>

    {isLoading ? (
      <SkeletonLeftPanelLoader />
    ) : error ? (
      <p className="text-red-500">{error}</p>
    ) : weatherData && (
      <>
        <div className="bg-black text-white p-4 rounded-lg mb-4">
          <h2 className="text-xl font-semibold">{address}</h2>
        </div>

        <p className="text-lg mb-4 text-charcoal">{weatherData.name}</p>

        <div className="text-center mb-6">
          <span className={clsx(textStyles.largeTemp, "text-black")}>
            {Math.round(weatherData.main?.temp)}{units === "imperial" ? "°F" : "°C"}
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