import useOutfitRecommendationQuery from 'src/hooks/queries/useOutfitRecommendationQuery';
import OutfitRecommendationSkeletonLoader from '../Skeletons/OutfitRecommendationSkeletonLoader';
import useWeatherQuery from 'src/hooks/queries/useWeatherQuery';
import { useGeolocationQuery } from 'src/hooks/queries/useGeolocationQuery';
import { useWeather } from 'src/hooks/useWeather';
import { DEFAULT_NY_LAT, DEFAULT_NY_LNG } from 'src/data/defaultData';
import Icon from '../Icon/Icon';
import { useMemo } from 'react';
import getPrecipitationForecast from 'src/util/calculateChanceOfPrecip/getPrecipitationForecast';

export default function OutfitRecommendation() {
  const { units } = useWeather();
  const { data: location } = useGeolocationQuery();

  const {
    currentWeather,
    forecast,
    isLoading: isLoadingWeather,
  } = useWeatherQuery({
    lat: location?.lat ?? DEFAULT_NY_LAT,
    lng: location?.lng ?? DEFAULT_NY_LNG,
    units,
  });

  const chanceOfPrecip = useMemo(
    () => getPrecipitationForecast(forecast),
    [forecast]
  );

  const {
    data: outfitRecommendation,
    isLoading: isLoadingOutfit,
    error: outfitError,
  } = useOutfitRecommendationQuery({
    currentWeather: currentWeather!,
    forecast: forecast!,
    units,
    chanceOfPrecip,
  });

  if (isLoadingWeather || isLoadingOutfit || !chanceOfPrecip) {
    return <OutfitRecommendationSkeletonLoader />;
  }

  if (outfitError || !outfitRecommendation) {
    return (
      <div className="bg-white p-4 rounded-md flex flex-row items-start gap- text-red-500">
        <div className="m-2">
          <button className="bg-black rounded-md w-[4em] h-[4em] self-start p-4">
            <Icon name="tshirt" size={32} fill="white" />
          </button>
        </div>
        <div className="m-2">Unable to load clothing recommendation</div>
      </div>
    );
  }

  return (
    <div
      data-testid="outfit-recommendation"
      className="bg-white p-4 rounded-md text-black flex flex-row items-start gap-4"
    >
      <div className="m-2">
        <button className="bg-black rounded-md w-[4em] h-[4em] self-start p-4">
          <Icon name="tshirt" size={32} fill="white" />
        </button>
      </div>

      <div className="m-2">
        <h3 className="font-medium text-lg italic mb-4">
          {"Today's clothing tip..."}
        </h3>
        <p className="text-gray-800">{outfitRecommendation.recommendation}</p>
      </div>
    </div>
  );
}
