import React, { useMemo } from 'react';
import WeeklyForecastSkeletonLoader from '../Skeletons/WeeklyForecastSkeletonLoader';
import { useWeather } from 'src/hooks/useWeather';
import { useGeolocationQuery } from 'src/hooks/queries/useGeolocationQuery';
import { DEFAULT_NY_LAT, DEFAULT_NY_LNG } from 'src/data/defaultData';
import DayForecast from '../DayForecast/DayForecast';
import { ForecastTransition } from '../ForecastTransitionWrapper/ForecastTransitionWrapper';
import useWeatherQuery from 'src/hooks/queries/useWeatherQuery';

export default function WeeklyForecast(): JSX.Element {
  const { units } = useWeather();

  const { data: location } = useGeolocationQuery();

  const { forecast, isLoading, error } = useWeatherQuery({
    lat: location?.lat ?? DEFAULT_NY_LAT,
    lng: location?.lng ?? DEFAULT_NY_LNG,
    units,
  });

  const filterForecastByUserTime = useMemo(() => {
    if (!forecast) return [];

    const forecastByDay: { [key: string]: (typeof forecast)[0][] } = {};

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
          return Math.abs(currHour - 12) < Math.abs(prevHour - 12)
            ? curr
            : prev;
        });
      });
  }, [forecast]);

  const locationKey = location ? `${location.lat}-${location.lng}` : 'default';

  if (isLoading) {
    return <WeeklyForecastSkeletonLoader />;
  }

  if (error || !forecast) {
    return (
      <div className="w-full flex flex-col justify-between">
        <h4
          className="text-xl font-semibold w-full"
          data-testid="forecast-heading"
        >
          5 Day Forecast
        </h4>
        <p className="text-xl font-semibold mb-4 w-full text-white">
          Unable to load forecast
        </p>
      </div>
    );
  }

  if (filterForecastByUserTime.length === 0) {
    return (
      <div className="w-full flex flex-col justify-between">
        <h4
          className="text-xl font-semibold w-full"
          data-testid="forecast-heading"
        >
          5 Day Forecast
        </h4>
        <p className="text-xl font-semibold mb-4 w-full text-white">
          No forecast data available
        </p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col">
      <h4
        className="text-xl font-semibold w-full"
        data-testid="forecast-heading"
      >
        5 Day Forecast
      </h4>
      <ForecastTransition
        locationKey={locationKey}
        className="flex self-end space-x-4 overflow-x-scroll w-full"
      >
        {filterForecastByUserTime.map((forecast, index) => (
          <DayForecast
            key={forecast.dt}
            forecast={forecast}
            units={units}
            index={index}
          />
        ))}
      </ForecastTransition>
    </div>
  );
}
