import React from 'react';
import { ForecastItem } from '@/types';

interface WeeklyForecastProps {
  forecast: ForecastItem[] | null;
}

const WeeklyForecast: React.FC<WeeklyForecastProps> = ({ forecast }) => {

  return (
    <div className="bg-charcoal w-full h-full p-4 flex flex-col justify-between overflow-x-hidden">
      <h2 className="text-xl font-semibold mb-4 w-full">5 Day Forecast</h2>
      <div className="flex border-2 border-white self-end space-x-4 overflow-x-scroll w-full">
        {forecast && forecast.map((day, index) => (
          <div key={index} className="bg-white w-[20em] h-[20em] p-4 rounded-lg text-charcoal shadow-md min-w-[250px]">
            <p className="font-semibold"></p>
            <p className="text-3xl font-bold my-2">{Math.round(day.main.temp)}°</p>
            <p>{day.weather[0].main}</p>
            <p>High: {Math.round(day.main.temp_max)}°</p>
            <p>Low: {Math.round(day.main.temp_min)}°</p>
          </div>
        ))} 
       
      </div>
    </div>
  );
};

export default WeeklyForecast;