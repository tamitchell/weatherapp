import {
  ForecastItem,
  PrecipitationForecast,
  PrecipitationType,
} from '../../types/types';

export default function getPrecipitationForecast(
  forecast: ForecastItem[]
): PrecipitationForecast {
  const next24Hours = forecast.slice(0, 8); // 8 3-hour periods
  let highestPop = 0;
  let totalRain = 0;
  let totalSnow = 0;
  let precipitationType = 'none';

  for (const period of next24Hours) {
    if (period.pop > highestPop) {
      highestPop = period.pop;
    }

    if (period.rain) {
      totalRain += period.rain['3h'] || period.rain['1h'] || 0;
      precipitationType = 'rain';
    }
    if (period.snow) {
      totalSnow += period.snow['3h'] || period.snow['1h'] || 0;
      precipitationType = totalRain > totalSnow ? 'rain' : 'snow';
    }
  }

  return {
    probability: Math.round(highestPop * 100),
    type: precipitationType as PrecipitationType,
    rainAmount: totalRain,
    snowAmount: totalSnow,
  };
}
