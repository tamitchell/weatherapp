import clsx from 'clsx';
import {
  Units,
  AirQualityDescription,
  PrecipitationForecast,
} from '../../types/types';
import { createWeatherDetails } from '../../util/createWeatherDetails/createWeatherDetails';

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
            // Base styles
            'rounded-2xl',
            'flex flex-col items-center justify-between',
            'p-4',
            'h-[clamp(130px,20vw,140px)]',
            'w-full',
            'relative',
            'overflow-hidden', // Important for shimmer effect
            'transition-all duration-300',
            // Glass effect
            'bg-gradient-to-br from-white/40 via-white/25 to-white/10',
            'dark:from-white/20 dark:via-white/10 dark:to-transparent',
            'backdrop-blur-xl',
            'border border-white/40 dark:border-white/10',
            // Shimmer effect container
            'group',
            // Shadow effects
            'shadow-[inset_0_0_20px_rgba(255,255,255,0.4)] dark:shadow-[inset_0_0_20px_rgba(255,255,255,0.05)]',
            'after:absolute after:inset-0 after:rounded-2xl after:shadow-[0_8px_32px_-8px_rgba(122,111,105,0.25)]'
          )}
        >
          {/* Shimmer overlay */}
          <div
            className={clsx(
              'absolute inset-0',
              "before:absolute before:content-[''] before:top-[-100%] before:left-[-100%]",
              'before:w-[200%] before:h-[200%]',
              'before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent',
              'before:transition-transform before:duration-[1.5s] before:ease-in-out',
              'before:rotate-[30deg]',
              'before:opacity-0',
              'group-hover:before:opacity-100',
              'before:group-hover:translate-x-[100%] before:group-hover:translate-y-[100%]',
              'pointer-events-none'
            )}
          />

          {/* Content */}
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
