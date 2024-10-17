import React, { useMemo } from 'react';
import { unix } from 'dayjs';
import ChanceOfRain from '../icons/ChanceOfRain';
import Humidity from '../icons/Humidity';
import Icon from '../icons/Icon';
import WeatherIcon from '../icons/WeatherIcon';
import { Units, ForecastItem } from '../types/types';
import WeeklyForecastSkeletonLoader from './WeeklyForecastSkeletalLoader';
import TemperatureRange from './TemperatureRange/TemperatureRange';

interface WeeklyForecastProps {
  forecast: ForecastItem[];
  units: Units;
  isLoading: boolean;
}

//TODO: Provide error state if available

export default function WeeklyForecast({ forecast, units, isLoading }: WeeklyForecastProps): JSX.Element {

  const filterForecastByUserTime = (forecastData: ForecastItem[]): ForecastItem[] => {
    const forecastByDay: { [key: string]: ForecastItem[] } = {};
  
    forecastData.forEach((entry) => {
      const forecastTime = new Date(entry.dt * 1000);
      const forecastDay = forecastTime.toISOString().split('T')[0]; // Get the day (YYYY-MM-DD)
  
      // Group forecast entries by day
      if (!forecastByDay[forecastDay]) {
        forecastByDay[forecastDay] = [];
      }
      forecastByDay[forecastDay].push(entry);
    });
  
    // Select a representative forecast item for each day (e.g., the one closest to noon)
    const fiveDayForecast = Object.keys(forecastByDay)
      .slice(0, 5) // Only take the next 5 days
      .map((day) => {
        const dayEntries = forecastByDay[day];
  
        // Find the forecast closest to noon (12:00 PM)
        const closestToNoon = dayEntries.reduce((prev, curr) => {
          const prevHour = new Date(prev.dt * 1000).getHours();
          const currHour = new Date(curr.dt * 1000).getHours();
          return Math.abs(currHour - 12) < Math.abs(prevHour - 12) ? curr : prev;
        });
  
        return closestToNoon;
      });
  
    return fiveDayForecast;
  };

  const fiveDayForecast = useMemo(() => filterForecastByUserTime(forecast), [forecast]);

  if (isLoading) {
    return <WeeklyForecastSkeletonLoader />;
  }

  return (
    <div className="w-full h-full p-4 flex flex-col justify-between overflow-x-hidden">
      <h2 className="text-xl font-semibold mb-4 w-full">5 Day Forecast</h2>
      <div className="flex self-end space-x-4 overflow-x-scroll w-full">
        {fiveDayForecast.length > 0 ? fiveDayForecast.map(({ main, weather, dt, wind, pop }, index) => (
          <div key={index} className="bg-white min-w-[250px] h-[320px] p-2 flex flex-col gap-[5px] justify-between rounded-lg shadow-lg text-center text-charcoal">
            <p className="text-md font-medium text-left">{unix(dt).format('MMM D')}</p>  {/* Display Date */}
            <div className="flex flex-col items-center my-3">
              <WeatherIcon name={weather[0].icon} size={56} fill='transparent' stroke='black' />
              <p className="text-xl font-bold my-1">{Math.round(main.temp)}{units === "imperial" ? "°F" : "°C"}</p>
              <p className="text-sm italic capitalize">{weather[0].description}</p> {/* Weather Description */}
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
