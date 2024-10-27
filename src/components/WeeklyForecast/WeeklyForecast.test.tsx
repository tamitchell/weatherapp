import { screen, within } from '@testing-library/react';
import WeeklyForecast from './WeeklyForecast';
import { Units } from 'src/types/types';
import { renderWithProviders } from 'src/test/util';
import { useGeolocationQuery } from 'src/hooks/queries/useGeolocationQuery';
import { useWeatherQuery } from 'src/hooks/queries/useWeatherQuery';
import dayjs from 'dayjs';


jest.mock('../WeatherIcon/WeatherIcon', () => ({
  __esModule: true,
  default: ({ name, index }: { name: string; index: number }) => (
    <div data-testid={`weather-icon-${index}`}>WeatherIcon: {name}</div>
  ),
}));

jest.mock('../MainTemperatureDisplay/MainTemperatureDisplay', () => ({
  __esModule: true,
  default: ({
    temp,
    units,
    index,
  }: {
    temp: number;
    units: Units;
    index: number;
  }) => (
    <div
      data-testid={`main-temp-${index}`}
    >{`MainTemperatureDisplay: ${temp} ${units}`}</div>
  ),
}));

jest.mock('../WeatherDescription/WeatherDescription', () => ({
  __esModule: true,
  default: ({ description, index }: { description: string; index: number }) => (
    <div
      data-testid={`weather-description-${index}`}
    >{`WeatherDescription: ${description}`}</div>
  ),
}));

jest.mock('../TemperatureRange/TemperatureRange', () => ({
  __esModule: true,
  default: () => <div data-testid="temperature-range">TemperatureRange</div>,
}));

jest.mock('../Icon/Icon', () => ({
  __esModule: true,
  default: ({ name }: { name: string }) => (
    <div data-testid={`icon-${name}`}>{name} Icon</div>
  ),
}));

jest.mock(
  '../WeeklyForecastSkeletonLoader/WeeklyForecastSkeletonLoader',
  () => ({
    __esModule: true,
    default: () => <div data-testid="loading-skeleton">Loading...</div>,
  })
);

jest.mock('../../hooks/queries/useGeolocationQuery');
jest.mock('../../hooks/queries/useWeatherQuery');
jest.mock('../../hooks/useWeather', () => ({
  useWeather: () => ({
    units: 'imperial' as Units
  })
}));

describe('WeeklyForecast', () => {
  it('displays the loading state', () => {
    (useGeolocationQuery as jest.Mock).mockReturnValue({
      data: { lat: 40.7128, lng: -74.0060 }
    });
    
    (useWeatherQuery as jest.Mock).mockReturnValue({
      isLoading: true,
      data: null
    });

    renderWithProviders(<WeeklyForecast />);
    
    expect(screen.getByTestId('loading-skeleton')).toBeInTheDocument();
  });

  it('displays error state when there is an error', () => {
    (useWeatherQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      error: new Error('Failed to fetch weather data'),
      forecast: null
    });

    renderWithProviders(<WeeklyForecast />);
    
    expect(screen.getByText('Unable to load forecast')).toBeInTheDocument();
  });

  it('displays error state when forecast is null', () => {
    (useWeatherQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      error: null,
      forecast: null
    });

    renderWithProviders(<WeeklyForecast />);
    
    expect(screen.getByText('Unable to load forecast')).toBeInTheDocument();
  });

  it('displays no forecast data available when filtered forecast is empty', () => {
    (useWeatherQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      error: null,
      forecast: [] // Empty array should trigger "No forecast data available"
    });

    renderWithProviders(<WeeklyForecast />);
    
    expect(screen.getByText('No forecast data available')).toBeInTheDocument();
  });

  it('renders forecast cards when data is available', () => {
    // Create mock data with multiple entries per day
    const mockForecast = Array.from({ length: 40 }, (_, index) => {
      const hourIncrement = index * 3; // OpenWeather sends forecasts in 3-hour increments
      const date = dayjs().add(Math.floor(hourIncrement / 24), 'day');
      const hour = hourIncrement % 24;
      
      return {
        dt: date.hour(hour).unix(),
        main: {
          temp: 72,
          temp_min: 68,
          temp_max: 75,
          humidity: 65
        },
        weather: [{
          id: 800,
          main: 'Clear',
          description: 'clear sky',
          icon: '01d'
        }],
        wind: {
          speed: 5,
          deg: 180
        },
        visibility: 10000,
        pop: 0.2,
        sys: { pod: 'd' },
        dt_txt: date.hour(hour).format('YYYY-MM-DD HH:mm:ss')
      };
    });

    (useWeatherQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      error: null,
      forecast: mockForecast
    });

    renderWithProviders(<WeeklyForecast />);
    
    // Check number of cards - should be exactly 5 after filtering
    const forecastCards = screen.getAllByTestId(/forecast-card-\d/);
    expect(forecastCards).toHaveLength(5);

    // Verify all 5 days are shown
    const today = dayjs();
    for (let i = 0; i < 5; i++) {
      const expectedDate = today.add(i, 'day').format('MMM D');
      expect(screen.getByText(expectedDate)).toBeInTheDocument();
    }

    // Check details of first card
    const firstCard = screen.getByTestId('forecast-card-0');
    within(firstCard).getByText('WeatherDescription: clear sky');
    within(firstCard).getByText('20%');
    within(firstCard).getByText('65%');
    within(firstCard).getByText('5 mph');
  });
});
  
  it('handles error state', () => {
    (useGeolocationQuery as jest.Mock).mockReturnValue({
      data: { lat: 40.7128, lng: -74.0060 }
    });
    
    (useWeatherQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      error: new Error('Failed to fetch weather data'),
      data: null
    });

    renderWithProviders(<WeeklyForecast />);
    
    expect(screen.getByText(/unable to load forecast/i)).toBeInTheDocument();
  });
// });