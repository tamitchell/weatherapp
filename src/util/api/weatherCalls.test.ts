import { ForecastItem, ForecastData } from 'src/types/types';
import {
  fetchCurrentWeather,
  fetchForecast,
  fetchAirQuality,
} from './weatherCalls';

fetchMock.enableMocks();

describe('Weather API functions', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  describe('fetchCurrentWeather', () => {
    it('fetches and returns current weather data', async () => {
      const mockWeather = {
        main: { temp: 72 },
        weather: [{ description: 'sunny' }],
      };

      fetchMock.mockResponseOnce(JSON.stringify(mockWeather));

      const result = await fetchCurrentWeather(40.7128, -74.006, 'imperial');
      expect(result).toEqual(mockWeather);
      expect(fetchMock).toHaveBeenCalledWith(
        expect.stringContaining(
          '/api/weather?lat=40.7128&lng=-74.006&units=imperial'
        )
      );
    });

    it('throws error on failed fetch', async () => {
      fetchMock.mockResponseOnce('', { status: 500 });

      await expect(
        fetchCurrentWeather(40.7128, -74.006, 'imperial')
      ).rejects.toThrow('Failed to fetch current weather');
    });
  });

  describe('fetchForecast', () => {
    it('fetches and returns only the forecast list array', async () => {
      const mockForecastItem: ForecastItem = {
        dt: 1634472000,
        main: {
          temp: 72,
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
        clouds: { all: 0 },
        wind: { speed: 5, deg: 180 },
        visibility: 10000,
        pop: 0,
        sys: { pod: 'd' },
        dt_txt: '2021-10-17 12:00:00',
      };

      const mockForecastResponse: ForecastData = {
        cod: '200',
        message: 0,
        cnt: 40,
        list: Array(40).fill(mockForecastItem),
        city: {
          id: 1234,
          name: 'Test City',
          coord: { lat: 40.7128, lon: -74.006 },
          country: 'US',
          population: 1000000,
          timezone: -14400,
          sunrise: 1634472000,
          sunset: 1634512800,
        },
      };

      fetchMock.mockResponseOnce(JSON.stringify(mockForecastResponse));

      const result = await fetchForecast(40.7128, -74.006, 'imperial');

      expect(result).toEqual(mockForecastResponse.list);
      expect(Array.isArray(result)).toBe(true);
      expect(result).toHaveLength(40);
      expect(result[0]).toEqual(mockForecastItem);
      expect(fetchMock).toHaveBeenCalledWith(
        expect.stringContaining(
          '/api/weather/forecast?lat=40.7128&lng=-74.006&units=imperial'
        )
      );
    });

    it('throws error on failed fetch', async () => {
      fetchMock.mockResponseOnce('', { status: 500 });

      await expect(fetchForecast(40.7128, -74.006, 'imperial')).rejects.toThrow(
        'Failed to fetch forecast'
      );
    });

    it('throws error on malformed response - missing list', async () => {
      const malformedResponse = { cod: '200', message: 0 }; // Missing list array
      fetchMock.mockResponseOnce(JSON.stringify(malformedResponse));

      await expect(fetchForecast(40.7128, -74.006, 'imperial')).rejects.toThrow(
        'Invalid forecast data structure'
      );
    });

    it('throws error on malformed response - list is not an array', async () => {
      const malformedResponse = {
        cod: '200',
        message: 0,
        list: 'not an array',
      };
      fetchMock.mockResponseOnce(JSON.stringify(malformedResponse));

      await expect(fetchForecast(40.7128, -74.006, 'imperial')).rejects.toThrow(
        'Invalid forecast data structure'
      );
    });
  });

  describe('fetchAirQuality', () => {
    it('fetches and returns air quality data', async () => {
      const mockAirQuality = {
        list: [{ main: { aqi: 2 } }],
      };

      fetchMock.mockResponseOnce(JSON.stringify(mockAirQuality));

      const result = await fetchAirQuality(40.7128, -74.006, 'imperial');
      expect(result).toEqual(mockAirQuality);
      expect(fetchMock).toHaveBeenCalledWith(
        expect.stringContaining(
          '/api/weather/air_pollution?lat=40.7128&lng=-74.006&units=imperial'
        )
      );
    });

    it('throws error on failed fetch', async () => {
      fetchMock.mockResponseOnce('', { status: 500 });

      await expect(
        fetchAirQuality(40.7128, -74.006, 'imperial')
      ).rejects.toThrow('Failed to fetch air quality');
    });
  });
});
