import useOutfitRecommendationQuery from "src/hooks/queries/useOutfitRecommendationQuery";
import OutfitRecommendationSkeletonLoader from "../Skeletons/OutfitRecommendationSkeletonLoader";
import useWeatherQuery from "src/hooks/queries/useWeatherQuery";
import { useGeolocationQuery } from "src/hooks/queries/useGeolocationQuery";
import { useWeather } from "src/hooks/useWeather";
import { DEFAULT_NY_LAT, DEFAULT_NY_LNG } from "src/data/defaultData";
import Icon from "../Icon/Icon";

export default function OutfitRecommendation() {
  const { units } = useWeather();
  const { data: location } = useGeolocationQuery();

  const { currentWeather, forecast, isLoading: isLoadingWeather } = useWeatherQuery({
    lat: location?.lat ?? DEFAULT_NY_LAT,
    lng: location?.lng ?? DEFAULT_NY_LNG,
    units,
  });

  const { 
    data: outfitRecommendation, 
    isLoading: isLoadingOutfit,
    error: outfitError 
  } = useOutfitRecommendationQuery({
    currentWeather: currentWeather!,
    forecast: forecast!,
    units,
  });

  if (isLoadingWeather || isLoadingOutfit) {
    return <OutfitRecommendationSkeletonLoader />;
  }


  if (outfitError || !outfitRecommendation) {
    return (
      <div className="bg-white p-4 rounded-md shadow text-red-500">
        Unable to load clothing recommendation
      </div>
    );
  }

  return (
    <div data-testid="outfit-recommendation" className="bg-white p-4 rounded-md text-black flex flex-row items-start gap-4">
      <button className="bg-black rounded-md w-[4em] h-[4em] self-start p-4">
      <Icon name="tshirt" size={32} fill="white"/>
      </button>
      <div className="m-2">
        <h3 className="font-medium text-lg italic mb-2">{"Today's clothing tip..."}</h3>
        <p className="text-gray-800">{outfitRecommendation.specialNotes}</p>
      </div>
    </div>
  );
}