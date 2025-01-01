import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import {
  ForecastItem,
  OutfitRecommendationResponse,
  PrecipitationForecast,
  Units,
  WeatherData,
} from 'src/types/types';
import { fetchOutfitRecommendation } from 'src/util/api/outfitRecommendationCall/outfitRecommendationCall';

export interface OutfitRecommendationQueryProps {
  currentWeather: WeatherData;
  forecast: ForecastItem[];
  units: Units;
  chanceOfPrecip: PrecipitationForecast;
}

/*
   3 degrees difference in F vs in C is not the same...we're using units as a identifier, 
   which means each time the user switches units they get a new outfit rec - which isn't necessary, 
   so we might need a better conversion to handle that bucket logic?
      */

export const generateOutfitQueryKey = (
  temp: number,
  condition: string,
  precip: number,
  precipType: string,
  units: Units
) => {

  // Convert to Celsius for consistent bucketing
  console.log("temperature", temp);
  console.log("condition", condition);
  const tempInC = units === 'imperial' ? (temp - 32) * 5 / 9 : temp;
  // Use 2°C buckets (roughly 3.6°F)
  const tempBucket = Math.round(tempInC / 2) * 2;

  return [
    'outfitRecommendation',
    tempBucket, // Temperature bucket in C
    condition,                         // Weather condition
    Math.round(precip / 20) * 20,     // Precip bucket (w/i 20%)
    precipType,                        // Type of precip
  ] as const
};

export default function useOutfitRecommendationQuery(
  props: OutfitRecommendationQueryProps,
  options?: Omit<UseQueryOptions<OutfitRecommendationResponse, Error>, 'queryKey' | 'queryFn'>
  ): UseQueryResult<OutfitRecommendationResponse, Error> {
  const { currentWeather, forecast, units, chanceOfPrecip } = props;
  // Generate key and log it
  const queryKey = currentWeather && chanceOfPrecip ? generateOutfitQueryKey(
    currentWeather.main.temp,
    currentWeather.weather[0].main,
    chanceOfPrecip.probability,
    chanceOfPrecip.type,
    units
  ) : null;

  console.log('Generated Query Key:', queryKey);
  console.log('Weather Condition:', currentWeather?.weather[0].main);
  console.log('Precip Type:', chanceOfPrecip.type);

  return useQuery({
    queryKey: queryKey || ['outfitRecommendation', 'initial'],
    queryFn: () => fetchOutfitRecommendation(
        currentWeather,
        forecast,
        units,
        chanceOfPrecip
    ),
    enabled: !!queryKey && !!currentWeather && !!forecast && !!currentWeather.id,
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 90,
    ...options
  });
}