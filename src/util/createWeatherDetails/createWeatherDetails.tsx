import Icon from '../../components/Icon/Icon';
import {
  AirQualityDescription,
  PrecipitationForecast,
  Units,
} from '../../types/types';
import formatVisibility from '../formatVisibility/formatVisibility';

interface WeatherCardDetail {
  title: string;
  icon: React.ReactNode;
  value: string;
}

interface WeatherMetrics {
  chanceOfPrecip: PrecipitationForecast;
  humidity: number;
  windSpeed: number;
  visibility: number;
  pressure: number;
  airQuality: AirQualityDescription;
  units: Units;
}

export const createWeatherDetails = ({
  chanceOfPrecip,
  humidity,
  windSpeed,
  visibility,
  pressure,
  airQuality,
  units,
}: WeatherMetrics): ReadonlyArray<WeatherCardDetail> =>
  Object.freeze([
    {
      title:
        chanceOfPrecip.type === 'snow' ? 'Chance of Snow' : 'Chance of Rain',
      icon:
        chanceOfPrecip.type === 'snow' ? (
          <Icon
            name="snowflake"
            size={30}
            className="text-secondary-foreground dark:text-primary"
          />
        ) : (
          <Icon
            name="raindrops"
            size={30}
            className="text-secondary-foreground dark:text-primary"
          />
        ),
      value: `${chanceOfPrecip.probability}%`,
    },
    {
      title: 'Humidity',
      icon: <Icon name="humidity" size={30} className="text-secondary-foreground dark:text-primary" />,
      value: `${humidity}%`,
    },
    {
      title: 'Wind Speed',
      icon: <Icon name="wind_speed" fill="transparent" size={30} className="text-secondary-foreground dark:text-primary" />,
      value: `${Math.round(windSpeed)} ${units === 'imperial' ? 'mph' : 'm/s'}`,
    },
    {
      title: 'Visibility',
      icon: <Icon name="visibility" size={30} className="text-secondary-foreground dark:text-primary" />,
      value: `${formatVisibility(visibility, units)}`,
    },
    {
      title: 'Pressure',
      icon: <Icon name="pressure" size={30} className="text-secondary-foreground dark:text-primary" />,
      value: `${pressure} ${units === 'imperial' ? 'inHg' : 'hPa'}`,
    },
    {
      title: 'Air Quality',
      icon: <Icon name="air_quality" stroke="transparent" size={30} className="text-secondary-foreground dark:text-primary" />,
      value: `${airQuality}`,
    },
  ]);
