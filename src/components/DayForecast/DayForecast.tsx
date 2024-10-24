'use client';
import React from 'react';
import { ForecastItem, PrecipitationType, Units } from 'src/types/types';
import { unix } from 'dayjs';
import TemperatureRange from '../TemperatureRange/TemperatureRange';
import DayWeatherStats from '../DayWeatherStats/DayWeatherStats';
import MainTemperatureDisplay from '../MainTemperatureDisplay/MainTemperatureDisplay';
import WeatherIcon from '../WeatherIcon/WeatherIcon';

interface DayForecastProps {
  forecast: ForecastItem;
  units: Units;
}

export default function DayForecast({ forecast, units }: DayForecastProps) {
  const { main, weather, dt, wind, pop, rain, snow } = forecast;
  const precipType: PrecipitationType = snow ? 'snow' : rain ? 'rain' : 'none';
  return (
    <div className="bg-white min-w-[250px] h-[320px] p-2 flex flex-col gap-[5px] justify-between rounded-lg shadow-lg text-center text-charcoal">
      <p className="text-md font-medium text-left">
        {unix(dt).format('MMM D')}
      </p>
      <div className="flex flex-col items-center my-3">
        <WeatherIcon
          name={weather[0].icon}
          size={56}
          fill="transparent"
          stroke="black"
        />
        <MainTemperatureDisplay
          units={units}
          className={'my-1'}
          temp={main.temp}
        />
        <p className="text-sm italic capitalize">{weather[0].description}</p>
      </div>
      <TemperatureRange
        tempMin={main.temp_min}
        tempMax={main.temp_max}
        units={units}
      />
      <DayWeatherStats
        pop={pop}
        humidity={main.humidity}
        windSpeed={wind.speed}
        units={units}
        precipType={precipType}
      />
    </div>
  );
}
