import clsx from 'clsx';
import {
  Units,
  AirQualityDescription,
  PrecipitationForecast,
} from '../types/types';
import { createWeatherDetails } from '../util/createWeatherDetails/createWeatherDetails';

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
    <div className="grid grid-cols-3 gap-2 w-full text-charcoal">
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
            'bg-white rounded-lg border-2 border-black',
            'flex flex-col items-center justify-between',
            'p-2',
            'h-[clamp(130px,20vw,140px)]',
            'w-full'
          )}
        >
          <div className="font-bold text-gray-900 p-[clamp(0.25rem,0.75vw,0.5rem)] text-center">
            {detail.icon}
          </div>
          <div className="font-bold text-gray-900 text-md text-center">
            {detail.value}
          </div>
          <div className="text-black text-xs text-center">{detail.title}</div>
        </div>
      ))}
    </div>
  );
}
