import React from 'react';
import { unix } from 'dayjs';
import ChanceOfRain from '../icons/ChanceOfRain';
import Humidity from '../icons/Humidity';
import Icon from '../icons/Icon';
import WeatherIcon from '../icons/WeatherIcon';
import { Units, ForecastItem } from '../types/types';
import WeeklyForecastSkeletonLoader from './WeeklyForecastSkeletalLoader';
import TemperatureRange from './TemperatureRange';

interface WeeklyForecastProps {
  forecast: ForecastItem[];
  units: Units;
  isLoading: boolean;
}

//TODO: Provide error state if available

export default function WeeklyForecast({ forecast, units, isLoading }: WeeklyForecastProps): JSX.Element {
  if (isLoading) {
    return <WeeklyForecastSkeletonLoader />;
  }

  return (
    <div className="w-full h-full p-4 flex flex-col justify-between overflow-x-hidden">
      <h2 className="text-xl font-semibold mb-4 w-full">5 Day Forecast</h2>
      <div className="flex self-end space-x-4 overflow-x-scroll w-full">
        {forecast.length > 0 ? forecast.map(({ main, weather, dt, wind, pop }, index) => (
          <div key={index} className="bg-white min-w-[250px] h-[320px] p-2 flex flex-col gap-[5px] justify-between rounded-lg shadow-lg text-center text-charcoal">
            <p className="text-md font-medium text-left">{unix(dt).format('MMM D')}</p>  {/* Display Date */}
            <div className="flex flex-col items-center my-3">
              <WeatherIcon name={weather[0].icon} size={56} fill='transparent' stroke='black' />
              <p className="text-xl font-bold my-1">{Math.round(main.temp)}{units === "imperial" ? "°F" : "°C"}</p>
              <p className="text-sm italic">{weather[0].description}</p> {/* Weather Description */}
            </div>
            <TemperatureRange tempMin={main.temp_min} tempMax={main.temp_max} units={units} />

            <div className="flex justify-between bg-black text-white p-2 rounded-lg text-sm">
              <div className="flex flex-col items-center">
                <ChanceOfRain size={28} />

                <p>{Math.round(pop * 100)}%</p>
              </div>
              <div className="flex flex-col items-center">
                <Humidity size={28} />
                <p>{main.humidity}%</p>
              </div>
              <div className="flex flex-col items-center">
                <Icon name="wind_speed" size={28} />
                <p>{Math.round(wind.speed)} {units === "imperial" ? "mph" : "m/s"}</p>
              </div>
            </div>
          </div>
        )) : null}

      </div>
    </div>
  );
};
