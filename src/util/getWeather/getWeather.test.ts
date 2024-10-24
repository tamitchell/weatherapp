import fetchMock from 'jest-fetch-mock';
import { getWeather } from './getWeather';

fetchMock.enableMocks();

describe('getWeather', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('fetches weather data successfully', async () => {
    const mockWeatherData = { name: 'New York', main: { temp: 20 } };
    const mockForecastData = { list: [{ dt: 1622541600, main: { temp: 22 } }] };
    const mockAirQualityData = { list: [{ main: { aqi: 2 } }] };

    fetchMock.mockResponseOnce(JSON.stringify(mockWeatherData));
    fetchMock.mockResponseOnce(JSON.stringify(mockForecastData));
    fetchMock.mockResponseOnce(JSON.stringify(mockAirQualityData));

    const result = await getWeather(40.7128, -74.0060, 'imperial');

    expect(result).toEqual({
      weather: mockWeatherData,
      forecast: mockForecastData.list,
      airQuality: mockAirQualityData,
    });

    expect(fetchMock.mock.calls.length).toBe(3);
    expect(fetchMock.mock.calls[0][0]).toContain('/api/weather?lat=40.7128&lng=-74.006&units=imperial');
    expect(fetchMock.mock.calls[1][0]).toContain('/api/weather/forecast?lat=40.7128&lng=-74.006&units=imperial');
    expect(fetchMock.mock.calls[2][0]).toContain('/api/weather/air_pollution?lat=40.7128&lng=-74.006&units=imperial');
  });

  it('throws an error when fetching fails', async () => {
    fetchMock.mockRejectOnce(new Error('API is down'));

    await expect(getWeather(40.7128, -74.0060, 'imperial')).rejects.toThrow('API is down');
  });

  it('throws an error when any response is not ok', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({}), { status: 200 });
    fetchMock.mockResponseOnce(JSON.stringify({}), { status: 404 });
    fetchMock.mockResponseOnce(JSON.stringify({}), { status: 200 });

    await expect(getWeather(40.7128, -74.0060, 'imperial')).rejects.toThrow('Failed to fetch weather data');
  });
});