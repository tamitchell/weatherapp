import { PrecipitationType, Units } from 'src/types/types';
import Icon from '../Icon/Icon';

interface DayWeatherStatsProps {
  pop: number;
  humidity: number;
  windSpeed: number;
  units: Units;
  precipType: PrecipitationType;
}

export default function DayWeatherStats({
  pop,
  humidity,
  windSpeed,
  units,
  precipType,
}: DayWeatherStatsProps) {
  const precipIconName = precipType === 'snow' ? 'snowflake' : 'raindrops';
  return (
    <div
      data-testid="day-weather-stats"
      className="flex justify-between w-full bg-black text-white p-2 rounded-lg text-sm"
    >
      <div className="flex flex-col items-center">
        <Icon name={precipIconName} size={28} fill="white" />
        <p>{Math.round(pop * 100)}%</p>
      </div>
      <div className="flex flex-col items-center">
        <Icon name="humidity" size={28} />
        <p>{humidity}%</p>
      </div>
      <div className="flex flex-col items-center">
        <Icon name="wind_speed" size={28} />
        <p>
          {Math.round(windSpeed)} {units === 'imperial' ? 'mph' : 'm/s'}
        </p>
      </div>
    </div>
  );
}
