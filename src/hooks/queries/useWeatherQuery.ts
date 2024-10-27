import { useQuery } from '@tanstack/react-query';
import { WeatherData, ForecastItem, AirQualityResponse, Units } from 'src/types/types';
import { fetchCurrentWeather, fetchForecast, fetchAirQuality } from 'src/util/api/weatherCalls';

interface WeatherQueryParams {
  lat: number;
  lng: number;
  units: Units;
}

export const useWeatherQuery = ({ lat, lng, units }: WeatherQueryParams) => {
      // Current weather needs frequent updates
  const currentWeather = useQuery<WeatherData, Error>({
    queryKey: ['weather', 'current', { lat, lng, units }],
    queryFn: () => fetchCurrentWeather(lat, lng, units),
    staleTime: 1000 * 60 * 10,  // 10 minutes
    gcTime: 1000 * 60 * 15,     // 15 minutes
    retry: 3,                    // More retries for current weather
  });

  // Forecast can be cached longer
  const forecast = useQuery<ForecastItem[], Error>({
    queryKey: ['weather', 'forecast', { lat, lng, units }],
    queryFn: () => fetchForecast(lat, lng, units),
    staleTime: 1000 * 60 * 60,  // 1 hour
    gcTime: 1000 * 60 * 90,     // 1.5 hours
  });

  // Air quality can also be cached longer
  const airQuality = useQuery<AirQualityResponse, Error>({
    queryKey: ['weather', 'airQuality', { lat, lng, units }],
    queryFn: () => fetchAirQuality(lat, lng, units),
    staleTime: 1000 * 60 * 60,  // 1 hour
    gcTime: 1000 * 60 * 90,     // 1.5 hours
  });

  return {
    currentWeather: currentWeather.data,
    forecast: forecast.data,
    airQuality: airQuality.data,
    isLoading: currentWeather.isLoading || forecast.isLoading || airQuality.isLoading,
    error: currentWeather.error || forecast.error || airQuality.error,
  };
  };