import settings from '../public/img/icons/util/settings.svg';
import visibility from '../public/img/icons/weather/visibility.svg';
import pressure from '../public/img/icons/weather/pressure.svg';
import air_quality from '../public/img/icons/util/mask.svg';
import wind_speed from '../public/img/icons/weather/wind_speed.svg';
import clear_day from '../public/img/icons/weather/sunny.svg';
import clear_night from '../public/img/icons/weather/clear_night.svg';
import cloudy_day from '../public/img/icons/weather/cloud_day.svg';
import cloudy_night from '../public/img/icons/weather/cloud_night.svg';
import cloudy from '../public/img/icons/weather/cloudy.svg';
import rain from '../public/img/icons/weather/rain.svg';
import thunderstorm from '../public/img/icons/weather/thunderstorm.svg';
import snow from '../public/img/icons/weather/snow.svg';
import fog from '../public/img/icons/weather/fog.svg';
import alertTriangle from '../public/img/icons/util/alert-triangle.svg';
import balloon from '../public/img/icons/util/balloon.svg';
import refresh from '../public/img/icons/util/refresh.svg';
import raindrops from '../public/img/icons/weather/raindrops.svg';
import snowflake from '../public/img/icons/weather/snowflake.svg';
import humidity from '../public/img/icons/weather/humidity.svg';
import tshirt from '../public/img/icons/util/t-shirt.svg';

export const iconMap = {
  balloon: balloon,
  settings: settings,
  visibility: visibility,
  pressure: pressure,
  air_quality: air_quality,
  wind_speed: wind_speed,
  cloud: cloudy,
  raindrops: raindrops,
  snowflake: snowflake,
  refresh: refresh,
  sun: clear_day,
  tshirt: tshirt,
  humidity: humidity,
  'alert-triangle': alertTriangle,
} as const;

export const weatherIconMap = {
  '01d': clear_day, // clear sky (day)
  '01n': clear_night, // clear sky (night)
  '02d': cloudy_day, // few clouds (day)
  '02n': cloudy_night, // few clouds (night)
  '03d': cloudy, // scattered clouds
  '03n': cloudy,
  '04d': cloudy, // broken clouds
  '04n': cloudy,
  '09d': rain, // shower rain
  '09n': rain,
  '10d': rain, // rain
  '10n': rain,
  '11d': thunderstorm, // thunderstorm
  '11n': thunderstorm,
  '13d': snow, // snow
  '13n': snow,
  '50d': fog, // mist
  '50n': fog,
} as const;

export type WeatherIconName = keyof typeof weatherIconMap;

export type IconName = keyof typeof iconMap;
