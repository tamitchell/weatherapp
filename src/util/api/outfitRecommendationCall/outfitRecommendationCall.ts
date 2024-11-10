import { ForecastItem, Units, WeatherData } from 'src/types/types';
import getBaseUrl from '../getBaseUrl';

export const fetchOutfitRecommendation = async (
  currentWeather: WeatherData,
  forecast: ForecastItem[],
  units: Units
) => {
  const baseUrl = getBaseUrl();
  try {
    const response = await fetch(`${baseUrl}/api/outfit-recommendation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        currentWeather,
        forecast,
        units,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching outfit recommendation:', error);
    throw new Error('Failed to fetch outfit recommendation');
  }
};
