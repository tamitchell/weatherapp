import {
  WeatherData,
  ForecastItem,
  AirQualityResponse,
  Units,
} from 'src/types/types';
import getPrecipitationForecast from 'src/util/calculateChanceOfPrecip/getPrecipitationForecast';
import getAirQualityDescription from 'src/util/getAQIDescription/getAQIDescription';
import DateDisplay from '../DateDisplay/DateDisplay';
import { SkeletonLeftPanelLoader } from '../SkeletalLeftPanel';
import TemperatureRange from '../TemperatureRange/TemperatureRange';
import WeatherDetailsGrid from '../WeatherDetailsGrid';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import { memo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface LeftPanelWeatherContentProps {
  currentWeather: WeatherData;
  forecast: ForecastItem[];
  airQuality: AirQualityResponse;
  units: Units;
  locationKey: string;
}

export default memo(function LeftPanelWeatherContent({
  currentWeather,
  forecast,
  airQuality,
  units,
  locationKey,
}: LeftPanelWeatherContentProps) {
  if (!currentWeather || !forecast || !airQuality) {
    return <SkeletonLeftPanelLoader />;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={locationKey}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{
          type: 'spring',
          stiffness: 100,
          damping: 15,
          mass: 0.5,
        }}
        className="flex flex-col gap-2"
      >
        <DateDisplay />
        <WeatherSummary
          cityName={currentWeather.name}
          description={currentWeather.weather[0].description}
          mainTemp={currentWeather.main.temp}
          feelsLike={currentWeather.main.feels_like}
          units={units}
        />
        <TemperatureRange
          tempMin={currentWeather.main.temp_min}
          tempMax={currentWeather.main.temp_max}
          units={units}
        />
        <WeatherDetailsGrid
          chanceOfPrecip={getPrecipitationForecast(forecast)}
          humidity={currentWeather.main.humidity}
          windSpeed={currentWeather.wind.speed}
          visibility={currentWeather.visibility}
          pressure={currentWeather.main.pressure}
          airQuality={getAirQualityDescription(airQuality.list[0].main.aqi)}
          units={units}
        />
      </motion.div>
    </AnimatePresence>
  );
});
