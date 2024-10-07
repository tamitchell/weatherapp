import settings from "../public/img/icons/settings.svg";
import visibility from "../public/img/icons/visibility.svg";
import pressure from "../public/img/icons/pressure.svg";
import air_quality from "../public/img/icons/mask.svg";
import wind_speed from "../public/img/icons/wind_speed.svg";
import clear_day from "../public/img/icons/sunny.svg";
import clear_night from "../public/img/icons/clear_night.svg";
import cloudy_day from "../public/img/icons/cloud_day.svg";
import cloudy_night from "../public/img/icons/cloud_night.svg";
import cloudy from "../public/img/icons/cloudy.svg";
import rain from  "../public/img/icons/rain.svg";
import thunderstorm from "../public/img/icons/thunderstorm.svg";
import snow from "../public/img/icons/snow.svg";
import fog from "../public/img/icons/fog.svg";

export const iconMap = {
    settings: settings,
    visibility: visibility,
    pressure: pressure,
    air_quality: air_quality,
    wind_speed: wind_speed
  } as const;

  export const weatherIconMap = {
    '01d': clear_day,      // clear sky (day)
    '01n': clear_night,    // clear sky (night)
    '02d': cloudy_day,     // few clouds (day)
    '02n': cloudy_night,// few clouds (night)
    '03d': cloudy,        // scattered clouds
    '03n': cloudy,
    '04d': cloudy,        // broken clouds
    '04n': cloudy,
    '09d': rain,          // shower rain
    '09n': rain,
    '10d': rain,          // rain
    '10n': rain,
    '11d': thunderstorm,  // thunderstorm
    '11n': thunderstorm,
    '13d': snow,          // snow
    '13n': snow,
    '50d': fog,           // mist
    '50n': fog,
  } as const;
  
  export type WeatherIconName = keyof typeof weatherIconMap;

  export type IconName = keyof typeof iconMap;