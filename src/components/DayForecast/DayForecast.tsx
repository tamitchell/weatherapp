'use client';
import React, { memo } from 'react';
import { ForecastItem, PrecipitationType, Units } from 'src/types/types';
import TemperatureRange from '../TemperatureRange/TemperatureRange';
import DayWeatherStats from '../DayWeatherStats/DayWeatherStats';
import MainTemperatureDisplay from '../MainTemperatureDisplay/MainTemperatureDisplay';
import WeatherIcon from '../WeatherIcon/WeatherIcon';
import { AnimatePresence, motion } from 'framer-motion';
import WeatherDescription from '../WeatherDescription/WeatherDescription';
import { unix } from 'dayjs';

interface DayForecastProps {
  forecast: ForecastItem;
  units: Units;
  index: number;
}

export default memo(function DayForecast({
  forecast,
  units,
  index,
}: DayForecastProps) {
  const { main, weather, dt, wind, pop, rain, snow } = forecast;
  const precipType: PrecipitationType = snow ? 'snow' : rain ? 'rain' : 'none';
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={forecast?.dt || 'loading'}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="forecast-card"
      >
        <div
          key={index}
          className="bg-white min-w-[250px] h-[320px] p-2 flex flex-col gap-2 justify-between rounded-lg shadow-lg text-center text-charcoal"
        >
          <p
            data-testid={`forecast-date-${index}`}
            className="text-md font-medium text-left"
          >
            {unix(dt).format('MMM D')}
          </p>
          <div className='flex flex-col items-center gap-2'>
          <div
            data-testid={`forecast-weather-${index}`}
            className="flex flex-col items-center"
          >
            <WeatherIcon
              data-testid={`weather-icon-${index}`}
              name={weather[0].icon}
              size={56}
              fill="transparent"
              stroke="black"
            />
            <MainTemperatureDisplay
              data-testid={`main-temp-${index}`}
              units={units}
              className={'my-1'}
              temp={main.temp}
            />
            <WeatherDescription
              data-testid={`weather-description-${index}`}
              description={weather[0].description}
            />
          </div>
          <TemperatureRange
            tempMin={main.temp_min}
            tempMax={main.temp_max}
            units={units}
          />
          <DayWeatherStats
            data-testid={`forecast-stats-${index}`}
            pop={pop}
            humidity={main.humidity}
            windSpeed={wind.speed}
            units={units}
            precipType={precipType}
          />
          </div>

        </div>
      </motion.div>
    </AnimatePresence>
  );
});
