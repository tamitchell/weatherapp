'use client';
import Search from '../Search/Search';
import clsx from 'clsx';
import { SkeletonLeftPanelLoader } from '../SkeletalLeftPanel';
import Logo from '../../icons/Logo';
import { useCallback } from 'react';
import UnitsToggle from '../UnitsToggle';
import { baseStyles } from '../../styles/styles';
import LeftPanelErrorState from '../LeftPanelErrorState';
import { DEFAULT_NY_LAT, DEFAULT_NY_LNG } from 'src/data/defaultData';
import { useGeolocationQuery } from 'src/hooks/queries/useGeolocationQuery';
import { useWeatherQuery } from 'src/hooks/queries/useWeatherQuery';
import { useWeather } from 'src/hooks/useWeather';
import LeftPanelWeatherContent from '../LeftPanelWeatherContent/LeftPanelWeatherContent';


export default function LeftPanel() {
    const { units, setUnits } = useWeather();

    const { data: location } = useGeolocationQuery();
  
    const { 
      currentWeather,
      forecast,
      airQuality,
      isLoading,
      error 
    } = useWeatherQuery({
      lat: location?.lat ?? DEFAULT_NY_LAT,
      lng: location?.lng ?? DEFAULT_NY_LNG,
      units
    });

    const handleUnitChange = useCallback(() => {
      setUnits(units === 'imperial' ? 'metric' : 'imperial');
    }, [units, setUnits]);

    if(isLoading) {
      return  <SkeletonLeftPanelLoader />
    }

    if(error) {
      return <LeftPanelErrorState />
    }
    
  return (
    <div className="bg-white p-4 w-full h-full flex flex-col">
      <div
        className={clsx(
          'flex items-center justify-start space-between flex-wrap',
          'w-full text-black h-[3.5em]'
        )}
      >
        <Logo width={250} height={18} />
        <UnitsToggle units={units} onToggle={handleUnitChange} />
      </div>
      <div
        className={clsx(baseStyles.flexCenter, 'w-full text-black h-[3.5em]')}
      >
        <Search />
      </div>

      
      {isLoading && <SkeletonLeftPanelLoader />}
      
      {!isLoading && currentWeather && forecast && airQuality && (
        <LeftPanelWeatherContent
          currentWeather={currentWeather}
          forecast={forecast}
          airQuality={airQuality}
          units={units}
        />
      )}
    </div>
  );
}
