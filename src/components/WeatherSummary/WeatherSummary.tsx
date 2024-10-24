import { Units } from '../../types/types';
import FeelsLikeTemperature from '../FeelsLikeTemperature/FeelsLikeTemperature';
import MainTemperatureDisplay from '../MainTemperatureDisplay/MainTemperatureDisplay';
import WeatherDescription from '../WeatherDescription/WeatherDescription';

interface WeatherSummaryProps {
  cityName: string;
  mainTemp: number;
  feelsLike: number;
  description: string;
  units: Units;
}

export default function WeatherSummary({
  cityName,
  mainTemp,
  feelsLike,
  description,
  units,
}: WeatherSummaryProps): JSX.Element {
  return (
    <div className="text-charcoal">
      <p className="text-lg mb-4" data-testid="city-name">
        {cityName}
      </p>
      <div className="text-center mb-6 text-black flex flex-col gap-2">
        <MainTemperatureDisplay
          className="text-[clamp(2rem,8vw,4rem)] text-black font-bold"
          temp={mainTemp}
          units={units}
        />
        <FeelsLikeTemperature feelsLike={feelsLike} units={units} />
        <WeatherDescription description={description} />
      </div>
    </div>
  );
}
