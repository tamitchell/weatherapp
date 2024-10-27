import React, { useMemo } from 'react';
import { unix } from 'dayjs';
import Icon from '../Icon/Icon';
import WeeklyForecastSkeletonLoader from '../WeeklyForecastSkeletonLoader/WeeklyForecastSkeletonLoader';
import TemperatureRange from '../TemperatureRange/TemperatureRange';
import WeatherIcon from '../WeatherIcon/WeatherIcon';
import MainTemperatureDisplay from '../MainTemperatureDisplay/MainTemperatureDisplay';
import WeatherDescription from '../WeatherDescription/WeatherDescription';
import { useWeather } from 'src/hooks/useWeather';
import { useGeolocationQuery } from 'src/hooks/queries/useGeolocationQuery';
import { useWeatherQuery } from 'src/hooks/queries/useWeatherQuery';
import { DEFAULT_NY_LAT, DEFAULT_NY_LNG } from 'src/data/defaultData';

export default function WeeklyForecast(): JSX.Element {
    const { units } = useWeather();

    const { data: location } = useGeolocationQuery();
  
    const { 
      forecast,
      isLoading,
      error 
    } = useWeatherQuery({
      lat: location?.lat ?? DEFAULT_NY_LAT,
      lng: location?.lng ?? DEFAULT_NY_LNG,
      units
    });

    const filterForecastByUserTime = useMemo(() => {
      if (!forecast) return [];
  
      const forecastByDay: { [key: string]: typeof forecast[0][] } = {};
  
      forecast.forEach((entry) => {
        const forecastTime = new Date(entry.dt * 1000);
        const forecastDay = forecastTime.toISOString().split('T')[0];
  
        if (!forecastByDay[forecastDay]) {
          forecastByDay[forecastDay] = [];
        }
        forecastByDay[forecastDay].push(entry);
      });
  
      return Object.keys(forecastByDay)
        .slice(0, 5)
        .map((day) => {
          const dayEntries = forecastByDay[day];
          return dayEntries.reduce((prev, curr) => {
            const prevHour = new Date(prev.dt * 1000).getHours();
            const currHour = new Date(curr.dt * 1000).getHours();
            return Math.abs(currHour - 12) < Math.abs(prevHour - 12) ? curr : prev;
          });
        });
    }, [forecast]);

  if (isLoading) {
    return <WeeklyForecastSkeletonLoader />;
  }

  if (error || !forecast) {
    // You might want to create a specific error state component for this
    return (
      <div className="w-full h-full p-4 flex flex-col justify-between">
        <h2 className="text-xl font-semibold mb-4 w-full">Unable to load forecast</h2>
      </div>
    );
  }

  if (filterForecastByUserTime.length === 0) {
    return (
      <div className="w-full h-full p-4 flex flex-col justify-between">
        <h2 className="text-xl font-semibold mb-4 w-full">No forecast data available</h2>
      </div>
    );
  }

  return (
    <div className="w-full h-full p-4 flex flex-col justify-between overflow-x-hidden">
      <h2
        className="text-xl font-semibold mb-4 w-full"
        data-testid="forecast-heading"
      >
        5 Day Forecast
      </h2>
      <div className="flex self-end space-x-4 overflow-x-scroll w-full">
        {filterForecastByUserTime.map(({ main, weather, dt, wind, pop, rain, snow }, index) => {
                const precipIconName = snow
                  ? 'snowflake'
                  : rain
                    ? 'raindrops'
                    : 'raindrops';

                return (
                  <div
                    key={index}
                    data-testid={`forecast-card-${index}`}
                    className="bg-white min-w-[250px] h-[320px] p-2 flex flex-col gap-[5px] justify-between rounded-lg shadow-lg text-center text-charcoal"
                  >
                    <p
                      data-testid={`forecast-date-${index}`}
                      className="text-md font-medium text-left"
                    >
                      {unix(dt).format('MMM D')}
                    </p>{' '}
                    {/* Display Date */}
                    <div
                      data-testid={`forecast-weather-${index}`}
                      className="flex flex-col items-center my-3"
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
                        className="my-1"
                        temp={main.temp}
                        units={units}
                      />
                      <WeatherDescription
                        data-testid={`weather-description-${index}`}
                        description={weather[0].description}
                      />
                    </div>
                    <TemperatureRange
                      data-testid={`temp-range-${index}`}
                      tempMin={main.temp_min}
                      tempMax={main.temp_max}
                      units={units}
                    />
                    <div
                      data-testid={`forecast-stats-${index}`}
                      className="flex justify-between bg-black text-white p-2 rounded-lg text-sm"
                    >
                      <div className="flex flex-col items-center">
                        <Icon
                          name={precipIconName}
                          fill="white"
                          size={28}
                          data-testid={`precip-icon-${index}`}
                        />
                        <p data-testid={`precip-percentage-${index}`}>
                          {Math.round(pop * 100)}%
                        </p>
                      </div>
                      <div className="flex flex-col items-center">
                        <Icon
                          data-testid={`humidity-icon-${index}`}
                          name="humidity"
                          size={28}
                        />
                        <p data-testid={`humidity-percentage-${index}`}>
                          {main.humidity}%
                        </p>
                      </div>
                      <div className="flex flex-col items-center">
                        <Icon
                          name="wind_speed"
                          size={28}
                          data-testid={`wind-icon-${index}`}
                        />
                        <p data-testid={`wind-speed-${index}`}>
                          {Math.round(wind.speed)}{' '}
                          {units === 'imperial' ? 'mph' : 'm/s'}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              }
            )}
      </div>
    </div>
  );
}
