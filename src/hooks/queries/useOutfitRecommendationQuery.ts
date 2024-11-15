import { useQuery } from '@tanstack/react-query';
import { ForecastItem, PrecipitationForecast, Units, WeatherData } from 'src/types/types';
import { fetchOutfitRecommendation } from 'src/util/api/outfitRecommendationCall/outfitRecommendationCall';

interface OutfitRecommendationQueryProps {
  currentWeather: WeatherData;
  forecast: ForecastItem[];
  units: Units;
  chanceOfPrecip: PrecipitationForecast;
}

export default function useOutfitRecommendationQuery({
  currentWeather,
  forecast,
  units,
  chanceOfPrecip
}: OutfitRecommendationQueryProps) {
  return useQuery({
    queryKey: ['outfitRecommendation', currentWeather?.id, units],
    queryFn: () => fetchOutfitRecommendation(currentWeather, forecast, units, chanceOfPrecip),
    enabled: !!currentWeather && !!forecast && !!currentWeather.id,
    staleTime: 1000 * 60 * 30,
    gcTime: 1000 * 60 * 60,
  });
}
