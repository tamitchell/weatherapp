import clsx from 'clsx';
import { Units } from '../../types/types';
import FeelsLikeTemperature from '../FeelsLikeTemperature/FeelsLikeTemperature';
import MainTemperatureDisplay from '../MainTemperatureDisplay/MainTemperatureDisplay';
import WeatherDescription from '../WeatherDescription/WeatherDescription';
import { themeStyles } from 'src/styles/styles';

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
    <div className={clsx(themeStyles.text)}>
      <p className="text-lg mb-4" data-testid="city-name">
        {cityName}
      </p>
      <div className={clsx(themeStyles.text, "text-center mb-6 flex flex-col gap-2")}>
        <MainTemperatureDisplay
          className={clsx(themeStyles.text, "text-[clamp(2rem,8vw,4rem)] font-bold")}
          temp={mainTemp}
          units={units}
        />
        <FeelsLikeTemperature feelsLike={feelsLike} units={units} className={themeStyles.text} />
        <WeatherDescription description={description} className={themeStyles.text}/>
      </div>
    </div>
  );
}
