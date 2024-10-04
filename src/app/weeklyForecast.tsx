import React from 'react';
import { ForecastItem, Units } from '@/app/types';

interface WeeklyForecastProps {
  forecast: ForecastItem[] | null;
  units: Units;
}

export default function WeeklyForecast({ forecast, units }: WeeklyForecastProps): JSX.Element {

  return (
    <div className="bg-charcoal w-full h-full p-4 flex flex-col justify-between overflow-x-hidden">
      <h2 className="text-xl font-semibold mb-4 w-full">5 Day Forecast</h2>
      <div className="flex self-end space-x-4 overflow-x-scroll w-full">
        {forecast && forecast.map(({ main, weather }, index) => (
          <div key={index} className="bg-white w-[20em] h-[20em] p-4 rounded-lg text-charcoal shadow-md min-w-[250px]">
            <p className="font-semibold"></p>
            <p className="text-3xl font-bold my-2">{Math.round(main.temp)}{units === "imperial" ? "°F" : "°C"}</p>
            <p>{weather[0].main}</p>
            <p>High: {Math.round(main.temp_max)}{units === "imperial" ? "°F" : "°C"}</p>
            <p>Low: {Math.round(main.temp_min)}{units === "imperial" ? "°F" : "°C"}</p>
          </div>
        ))} 
       
      </div>
    </div>
  );
};
