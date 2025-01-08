import clsx from 'clsx';
import {
  Units,
  AirQualityDescription,
  PrecipitationForecast,
} from '../../types/types';
import { createWeatherDetails } from '../../util/createWeatherDetails/createWeatherDetails';
import { themeStyles } from 'src/styles/styles';

interface WeatherDetailsGridProps {
  chanceOfPrecip: PrecipitationForecast;
  humidity: number;
  windSpeed: number;
  visibility: number;
  pressure: number;
  airQuality: AirQualityDescription;
  units: Units;
}

export default function WeatherDetailsGrid({
  chanceOfPrecip = {
    probability: 0,
    type: 'none',
    rainAmount: 0,
    snowAmount: 0,
  },
  humidity,
  windSpeed,
  visibility,
  pressure,
  airQuality,
  units,
}: WeatherDetailsGridProps): JSX.Element {
  return (
    <div className="grid grid-cols-3 gap-2 w-full">
      {createWeatherDetails({
        chanceOfPrecip,
        humidity,
        windSpeed,
        visibility,
        pressure,
        airQuality,
        units,
      }).map((detail, index) => (
        <div
          key={index}
          className={clsx(
            themeStyles.complementaryOffset,
            'rounded-sm',
            'flex flex-col items-center justify-between',
            'p-4',
            'h-[clamp(130px,20vw,140px)]',
            'w-full',
            'relative'
          )}
        >
          <div />

          <div className="font-bold p-[clamp(0.25rem,0.75vw,0.5rem)] text-center relative z-10">
            {detail.icon}
          </div>
          <div className="font-bold text-md text-center text-gray-800/90 dark:text-white/90 relative z-10">
            {detail.value}
          </div>
          <div className="text-xs text-gray-600/80 dark:text-gray-300/80 relative z-10">
            {detail.title}
          </div>
        </div>
      ))}
    </div>
  );
}
