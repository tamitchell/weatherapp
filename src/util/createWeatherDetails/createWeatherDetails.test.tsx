import {
  AirQualityDescription,
  PrecipitationType,
  Units,
} from 'src/types/types';
import { createWeatherDetails } from './createWeatherDetails';
import formatVisibility from '../formatVisibility/formatVisibility';

// Mock the Icon component, since we're only concerned with the logic, not the rendering
jest.mock('../../components/Icon/Icon', () => ({
  __esModule: true,
  default: ({ name }: { name: string }) => `Icon: ${name}`,
}));

describe('createWeatherDetails', () => {
  const baseWeatherMetrics = {
    chanceOfPrecip: {
      probability: 50,
      type: 'rain' as PrecipitationType,
      rainAmount: 5,
      snowAmount: 0,
    },
    humidity: 80,
    windSpeed: 10,
    visibility: 10000,
    pressure: 1013,
    airQuality: 'Good' as AirQualityDescription,
    units: 'imperial' as Units,
  };

  it('creates correct details for rain with imperial units', () => {
    const details = createWeatherDetails(baseWeatherMetrics);

    expect(details).toMatchObject([
      {
        title: '% of Rain',
        value: '50%',
      },
      {
        title: 'Humidity',
        value: '80%',
      },
      {
        title: 'Wind Speed',
        value: '10 mph',
      },
      {
        title: 'Visibility',
        value: formatVisibility(10000, 'imperial'),
      },
      {
        title: 'Pressure',
        value: '1013 inHg',
      },
      {
        title: 'Air Quality',
        value: 'Good',
      },
    ]);
  });

  it('creates correct details for snow with metric units', () => {
    const snowMetrics = {
      ...baseWeatherMetrics,
      chanceOfPrecip: {
        probability: 70,
        type: 'snow' as PrecipitationType,
        rainAmount: 0,
        snowAmount: 10, // 10 units of snow
      },
      units: 'metric' as Units,
    };
    const details = createWeatherDetails(snowMetrics);

    expect(details).toMatchObject([
      {
        title: '% of Snow',
        value: '70%',
      },
      {
        title: 'Humidity',
        value: '80%',
      },
      {
        title: 'Wind Speed',
        value: '10 m/s', // Metric units for wind speed
      },
      {
        title: 'Visibility',
        value: formatVisibility(10000, 'metric'),
      },
      {
        title: 'Pressure',
        value: '1013 hPa', // Metric units for pressure
      },
      {
        title: 'Air Quality',
        value: 'Good',
      },
    ]);
  });

  it('handles zero precipitation correctly', () => {
    const noPrecipMetrics = {
      ...baseWeatherMetrics,
      chanceOfPrecip: {
        probability: 0,
        type: 'rain' as PrecipitationType,
        rainAmount: 0,
        snowAmount: 0,
      },
    };

    const details = createWeatherDetails(noPrecipMetrics);

    expect(details[0]).toMatchObject({
      title: '% of Rain',
      value: '0%',
    });
  });
});
