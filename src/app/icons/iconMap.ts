import settings from "../../img/icons/settings.svg";
import visibility from "../../img/icons/visibility.svg";
import pressure from "../../img/icons/pressure.svg";
import air_quality from "../../img/icons/mask.svg";
import wind_speed from "../../img/icons/wind_speed.svg";
import clear_day from "../../img/icons/sunny.svg";
import clear_night from "../../img/icons/clear_night.svg";
import cloudy_day from "../../img/icons/cloud_day.svg";
import cloudy_night from "../../img/icons/cloud_night.svg";
import cloudy from "../../img/icons/cloudy.svg";
import rain from  "../../img/icons/rain.svg";
import thunderstorm from "../../img/icons/thunderstorm.svg";
import snow from "../../img/icons/snow.svg";
import fog from "../../img/icons/fog.svg";

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