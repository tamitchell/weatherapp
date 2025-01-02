'use client';
import { SkeletonLeftPanelLoader } from '../Skeletons/SkeletalLeftPanel';
import { useCallback } from 'react';
import LeftPanelErrorState from '../LeftPanelErrorState';
import { DEFAULT_NY_LAT, DEFAULT_NY_LNG } from 'src/data/defaultData';
import { useGeolocationQuery } from 'src/hooks/queries/useGeolocationQuery';
import { useWeather } from 'src/hooks/useWeather';
import LeftPanelWeatherContent from '../LeftPanelWeatherContent/LeftPanelWeatherContent';
import LeftPanelHeader from '../LeftPanelHeader/LeftPanelHeader';
import useWeatherQuery from 'src/hooks/queries/useWeatherQuery';

export default function LeftPanel() {
  const { units, setUnits } = useWeather();

  const { data: location } = useGeolocationQuery();

  const { currentWeather, forecast, airQuality, isLoading, error } =
    useWeatherQuery({
      lat: location?.lat ?? DEFAULT_NY_LAT,
      lng: location?.lng ?? DEFAULT_NY_LNG,
      units,
    });

  const handleUnitChange = useCallback(() => {
    setUnits(units === 'imperial' ? 'metric' : 'imperial');
  }, [units, setUnits]);

  const locationKey = location ? `${location.lat}-${location.lng}` : 'default';

  if (isLoading) {
    return <SkeletonLeftPanelLoader />;
  }

  if (error) {
    return <LeftPanelErrorState />;
  }

  return (
    <div className="bg-white p-4 w-full h-full flex flex-col">
      <LeftPanelHeader units={units} onUnitChange={handleUnitChange} />

      {currentWeather && forecast && airQuality && (
        <LeftPanelWeatherContent
          currentWeather={currentWeather}
          forecast={forecast}
          airQuality={airQuality}
          units={units}
          locationKey={locationKey}
        />
      )}
    </div>
  );
}
