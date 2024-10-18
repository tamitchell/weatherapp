import dayjs from "dayjs";
import { Clouds, ForecastItem, ForecastSys, MainWeatherData, WeatherCondition, Wind } from "src/types/types";

export function generateMainWeatherData({
    temp = 20,
    feels_like = 20,
    temp_min = 15,
    temp_max = 25,
    pressure = 1013,
    humidity = 75,
    sea_level = 1013,
    grnd_level = 1013
  }: Partial<MainWeatherData> = {}): MainWeatherData {
    return {
      temp,
      feels_like,
      temp_min,
      temp_max,
      pressure,
      humidity,
      sea_level,
      grnd_level
    };
  }

  export function generateClouds(all = 100): Clouds {
    return { all };
  }

  export function generateWind({
    speed = 5,
    deg = 180,
    gust
  }: Partial<Wind> = {}): Wind {
    return {
      speed,
      deg,
      gust
    };
  }
  
  // Utility function to generate mock ForecastSys
  export function generateSys(pod = 'd'): ForecastSys {
    return { pod };
  }
  

  export function generateForecastItem({
    dt,
    pop = 0,
    rainAmount = 0,
    snowAmount = 0,
    dt_txt,
    temp = 20,
    feels_like = 20,
    temp_min = 15,
    temp_max = 25,
    pressure = 1013,
    humidity = 75,
    wind_speed = 5,
    wind_deg = 180,
    clouds_all = 100,
    pod = 'd',
    weather_id = 800,
    weather_main = 'Clear',
    weather_description = 'clear sky',
    weather_icon = '01d'
  }: {
    dt: number;
    pop?: number;
    rainAmount?: number;
    snowAmount?: number;
    dt_txt: string;
    temp?: number;
    feels_like?: number;
    temp_min?: number;
    temp_max?: number;
    pressure?: number;
    humidity?: number;
    wind_speed?: number;
    wind_deg?: number;
    clouds_all?: number;
    pod?: string;
    weather_id?: number;
    weather_main?: string;
    weather_description?: string;
    weather_icon?: string;
  }): ForecastItem {
    const weatherCondition: WeatherCondition = {
      id: weather_id,
      main: weather_main,
      description: weather_description,
      icon: weather_icon as WeatherCondition['icon']
    };
  
    return {
      dt,
      pop,
      rain: rainAmount > 0 ? { '3h': rainAmount } : undefined,
      snow: snowAmount > 0 ? { '3h': snowAmount } : undefined,
      dt_txt,
      main: generateMainWeatherData({ temp, feels_like, temp_min, temp_max, pressure, humidity }),
      clouds: generateClouds(clouds_all),
      wind: generateWind({ speed: wind_speed, deg: wind_deg }),
      visibility: 10000,
      sys: generateSys(pod),
      weather: [weatherCondition],
    };
  }

  export function generateMockForecast(
    periods: number,
    rainAmounts: number[] = [],
    snowAmounts: number[] = [],
    pops: number[] = [],
    startDate?: number // Optional start date timestamp
  ): ForecastItem[] {
    const forecast: ForecastItem[] = [];
    const start = startDate ? dayjs.unix(startDate) : dayjs().startOf('day');
  
    for (let i = 0; i < periods; i++) {
      const rain = rainAmounts[i] || 0;
      const snow = snowAmounts[i] || 0;
      const pop = pops[i] || 0;
      const currentDate = start.add(i, 'day');
      const timestamp = currentDate.unix();
  
      forecast.push(generateForecastItem({
        dt: timestamp,
        pop,
        rainAmount: rain,
        snowAmount: snow,
        dt_txt: currentDate.format('YYYY-MM-DD 12:00:00')
      }));
    }
    return forecast;
  }