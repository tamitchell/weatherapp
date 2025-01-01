import { renderHook, waitFor } from '@testing-library/react';
import useOutfitRecommendationQuery from './useOutfitRecommendationQuery';
import { generateMockForecast, generateWeatherData } from 'src/util/generators';
import { createWrapper } from 'src/test/util';
import { PrecipitationForecast, Units } from 'src/types/types';

// mock that returns different recs based on conditions
jest.mock(
  '../../../util/api/outfitRecommendationCall/outfitRecommendationCall',
  () => {
    const mockFetch = jest.fn().mockImplementation((weather) => {
      if (weather.weather[0].main === 'Rain') {
        return Promise.resolve({
          recommendation: "Don't forget your umbrella and raincoat",
        });
      }
      return Promise.resolve({
        recommendation: 'Wear a light jacket',
      });
    });

    return {
      fetchOutfitRecommendation: mockFetch,
    };
  }
);

describe('useOutfitRecommendationQuery', () => {
  const mockWeather = generateWeatherData({
    main: {
      temp: 72.8,
      feels_like: 70,
      temp_min: 68,
      temp_max: 75,
      pressure: 1015,
      humidity: 65,
    },
    weather: [
      {
        id: 800,
        main: 'Clear',
        description: 'clear sky',
        icon: '01d',
      },
    ],
  });

  const mockPrecip: PrecipitationForecast = {
    probability: 20,
    type: 'none',
    rainAmount: 0,
    snowAmount: 0,
  };

  const mockForecast = generateMockForecast(8);

  it('uses same cache for similar weather conditions', async () => {
    const { result, rerender } = renderHook(
      () =>
        useOutfitRecommendationQuery({
          currentWeather: mockWeather,
          forecast: mockForecast,
          units: 'imperial',
          chanceOfPrecip: mockPrecip,
        }),
      {
        wrapper: createWrapper(),
      }
    );

    // Wait for initial data
    await waitFor(() => {
      expect(result.current.data).toBeTruthy();
    });

    const initialData = result.current.data;

    // Rerender with slightly different temperature
    rerender({
      currentWeather: {
        ...mockWeather,
        main: { ...mockWeather.main, temp: 73.2 },
      },
      forecast: mockForecast,
      units: 'imperial',
      chanceOfPrecip: mockPrecip,
    });

    // Should have same data (from cache)
    expect(result.current.data).toBe(initialData);
  });

  it('fetches new data for significant weather changes', async () => {
    let props = {
      currentWeather: mockWeather,
      forecast: mockForecast,
      units: 'imperial' as Units,
      chanceOfPrecip: mockPrecip,
    };

    const { result, rerender } = renderHook(
      () => useOutfitRecommendationQuery(props),
      {
        wrapper: createWrapper(),
      }
    );

    await waitFor(() => {
      expect(result.current.data).toBeTruthy();
    });

    const initialData = result.current.data;

    // Create new props with rain weather
    props = {
      currentWeather: {
        ...mockWeather,
        weather: [{ ...mockWeather.weather[0], main: 'Rain' }],
      },
      forecast: mockForecast,
      units: 'imperial',
      chanceOfPrecip: { ...mockPrecip, type: 'rain', probability: 80 },
    };

    console.log('New Props Weather:', props.currentWeather.weather[0].main);
    console.log('New Props Precip:', props.chanceOfPrecip);

    // Rerender with new props
    rerender(props);

    await waitFor(() => {
      expect(result.current.data).toBeTruthy();
      expect(result.current.data).not.toBe(initialData);
    });
  });
});
