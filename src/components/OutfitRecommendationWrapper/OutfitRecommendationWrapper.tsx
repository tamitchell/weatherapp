import useWeatherQuery from 'src/hooks/queries/useWeatherQuery';
import { useGeolocationQuery } from 'src/hooks/queries/useGeolocationQuery';
import { useWeather } from 'src/hooks/useWeather';
import { DEFAULT_NY_LAT, DEFAULT_NY_LNG } from 'src/data/defaultData';
import { memo } from 'react';
import getPrecipitationForecast from 'src/util/calculateChanceOfPrecip/getPrecipitationForecast';
import OutfitRecommendationError from './OutfitRecommendationError';
import OutfitRecommendation from '../OutfitRecommendation/OutfitRecommendation';
import OutfitRecommendationWrapperSkeleton from '../Skeletons/OutfitRecommendationWrapperSkeleton';

export default memo(function OutfitRecommendationWrapper() {
  const { units } = useWeather();
  const { data: location } = useGeolocationQuery();

  const {
    currentWeather,
    forecast,
    isLoading: isLoadingWeather,
    error,
  } = useWeatherQuery({
    lat: location?.lat ?? DEFAULT_NY_LAT,
    lng: location?.lng ?? DEFAULT_NY_LNG,
    units,
  });

  // First handle loading state
  if (isLoadingWeather) {
    return <OutfitRecommendationWrapperSkeleton />;
  }

  // Then handle error state
  if (error) {
    return <OutfitRecommendationError />;
  }

  // Finally handle missing data state
  if (!currentWeather || !forecast) {
    return <OutfitRecommendationWrapperSkeleton />;
  }

  const chanceOfPrecip = getPrecipitationForecast(forecast);

  return (
    <OutfitRecommendation
      chanceOfPrecip={chanceOfPrecip}
      currentWeather={currentWeather}
      forecast={forecast}
      units={units}
    />
  );
});
