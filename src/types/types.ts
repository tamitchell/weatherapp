export interface WeatherData {
  coord: Coordinates;
  weather: WeatherCondition[];
  base: string;
  main: MainWeatherData;
  visibility: number;
  wind: Wind;
  clouds: Clouds;
  dt: number;
  sys: SysInfo;
  timezone: number;
  id: number;
  name: string;
  cod: number;
  rain?: Rain;
  snow?: Snow;
}

export interface Rain {
  '1h'?: number;
  '3h'?: number;
}

export interface Snow {
  '1h'?: number;
  '3h'?: number;
}

export type WeatherQuotes = {
  rain: string[];
  clear: string[];
  clouds: string[];
  thunderstorm: string[];
};

export type Units = 'metric' | 'imperial';

export interface Coordinates {
  lon: number;
  lat: number;
}

export interface Wind {
  speed: number;
  deg: number;
  gust?: number;
}

export interface Clouds {
  all: number;
}

export interface SysInfo {
  type: number;
  id: number;
  country: string;
  sunrise: number;
  sunset: number;
}

export interface WeatherCondition {
  id: number;
  main: string;
  description: string;
  icon:
    | '01d'
    | '01n'
    | '02d'
    | '02n'
    | '03d'
    | '03n'
    | '04d'
    | '04n'
    | '09d'
    | '09n'
    | '10d'
    | '10n'
    | '11d'
    | '11n'
    | '13d'
    | '13n'
    | '50d'
    | '50n';
}

export interface MainWeatherData {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level?: number;
  grnd_level?: number;
}

export interface WeatherProps {
  data: WeatherData | null;
  address: string;
}

export interface LastLocation {
  lat: number;
  lng: number;
  address: string;
}

export interface ForecastSys {
  pod: string;
}

export interface City {
  id: number;
  name: string;
  coord: Coordinates;
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
}

export interface ForecastData {
  cod: string;
  message: number;
  cnt: number;
  list: ForecastItem[];
  city: City;
}

export interface ForecastItem {
  dt: number;
  main: MainWeatherData;
  weather: WeatherCondition[];
  clouds: Clouds;
  wind: Wind;
  visibility: number;
  pop: number;
  rain?: Rain;
  snow?: Snow;
  sys: ForecastSys;
  dt_txt: string;
}

export interface WeatherContextProps {
  units: Units;
  setUnits: (units: Units) => void;
  address: string | null;
  setAddress: (address: string | null) => void;
}

//  export interface SearchProps {
//     getLatLng: (input: string) => Promise<GeocodeResult | null>;
//     isLoading: boolean;
//   };

export type Result = {
  formatted_address: string;
  location: {
    lat: number;
    lng: number;
  };
};

export interface GeocodeResult {
  lat: number;
  lng: number;
  formatted_address: string;
}

export interface LocationProps {
  results: Result[];
  getWeather: (lat: number, lng: number, address: string) => Promise<void>;
}

export interface HomeProps {
  initialWeather: WeatherData | null;
  initialAddress: string;
}

export interface PageProps {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export interface PlaceChangeEvent extends Event {
  detail: { place: google.maps.places.PlaceResult }; // The event detail should have a place object
}

export interface IconProps {
  size?: number | string;
  color?: string;
  className?: string;
}

export enum AirQualityIndex {
  Good = 1,
  Fair,
  Moderate,
  Poor,
  VeryPoor,
}

export type AirQualityDescription =
  | 'Good'
  | 'Fair'
  | 'Moderate'
  | 'Poor'
  | 'Very Poor'
  | 'Unknown';

export type AirQualityResponse = {
  coord: Coordinates;
  list: Array<{
    main: {
      aqi: number; // Air Quality Index (1 to 5)
    };
    components: {
      co: number; // Carbon Monoxide (μg/m³)
      no: number; // Nitric Oxide (μg/m³)
      no2: number; // Nitrogen Dioxide (μg/m³)
      o3: number; // Ozone (μg/m³)
      so2: number; // Sulfur Dioxide (μg/m³)
      pm2_5: number; // Fine Particulate Matter PM2.5 (μg/m³)
      pm10: number; // Coarse Particulate Matter PM10 (μg/m³)
      nh3: number; // Ammonia (μg/m³)
    };
    dt: number; // Timestamp in UNIX format
  }>;
};

export interface TemperatureRangeProps {
  tempMin: number;
  tempMax: number;
  units: Units;
}

export type ErrorType = 'weather' | 'forecast' | 'airQuality' | 'general';

export interface WeatherState {
  weather: WeatherData | null;
  forecast: ForecastItem[];
  airQuality: AirQualityResponse | null;
  address: string | null;
  isLoading: boolean;
  error:
    | {
        [key in ErrorType]?: string;
      }
    | null;
  units: Units;
  timestamp?: number;
}

export type WeatherAction =
  /**
   * Sets the current weather data.
   * @payload WeatherData | null - The current weather data or null if not available.
   */
  | { type: 'SET_WEATHER'; payload: WeatherData | null }

  /**
   * Sets the weather forecast data.
   * @payload ForecastItem[] - An array of forecast items.
   */
  | { type: 'SET_FORECAST'; payload: ForecastItem[] }

  /**
   * Sets the air quality data.
   * @payload AirQualityResponse | null - The air quality data or null if not available.
   */
  | { type: 'SET_AIR_QUALITY'; payload: AirQualityResponse | null }

  /**
   * Sets the address for the current weather location.
   * @payload string | null - The address string or null if not available.
   */
  | { type: 'SET_ADDRESS'; payload: string | null }

  /**
   * Sets the loading state of the weather data.
   * @payload boolean - True if data is being loaded, false otherwise.
   */
  | { type: 'SET_LOADING'; payload: boolean }

  /**
   * Sets an error state for a specific part of the weather data.
   * @payload { type: ErrorType; message: string } - The type of error and the error message.
   */
  | { type: 'SET_ERROR'; payload: { type: ErrorType; message: string } }

  /**
   * Clears an error for a specific part of the weather data.
   * @payload ErrorType - The type of error to clear.
   */
  | { type: 'CLEAR_ERROR'; payload: ErrorType }

  /**
   * Sets the units used for weather measurements.
   * @payload Units - The units to use ('imperial' or 'metric').
   */
  | { type: 'SET_UNITS'; payload: Units }

  /**
   * Sets the timestamp for when the weather data was last updated.
   * @payload number - The timestamp in milliseconds.
   */
  | { type: 'SET_TIMESTAMP'; payload: number };

export interface WeatherCacheKeyComponents {
  lat: number;
  lng: number;
  units: Units;
}

export type WeatherCacheKey = `weather_${number}_${number}_${Units}`;

export type PrecipitationType = 'none' | 'rain' | 'snow';

export interface PrecipitationForecast {
  probability: number;
  type: PrecipitationType;
  rainAmount: number;
  snowAmount: number;
}
