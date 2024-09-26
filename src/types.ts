
export interface Coordinates {
  lon: number;
  lat: number;
}

export interface WeatherCondition {
  id: number;
  main: string;
  description: string;
  icon: string;
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

export interface Wind {
  speed: number;
  deg: number;
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
}

  export interface WeatherProps {
    data: WeatherData | null;
    address: string;
  };
  
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
  };
  

  export interface HomeProps {
    initialWeather: WeatherData | null;
    initialAddress: string;
  };

  export interface PageProps {
    params: { slug: string };
    searchParams: { [key: string]: string | string[] | undefined };
  }