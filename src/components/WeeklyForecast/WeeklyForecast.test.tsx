import { screen, within } from '@testing-library/react';
import WeeklyForecast from './WeeklyForecast';
import { ForecastItem, Units } from 'src/types/types';
import { renderWithProviders } from 'src/test/util';
import { useGeolocationQuery } from 'src/hooks/queries/useGeolocationQuery';
import { useWeatherQuery } from 'src/hooks/queries/useWeatherQuery';
import dayjs, { unix } from 'dayjs';

// Mock components
jest.mock('../DayForecast/DayForecast', () => ({
  __esModule: true,
  default: ({ forecast, units, index }: { forecast: ForecastItem; units: Units; index: number }) => (
    <div data-testid={`forecast-card-${index}`} className="forecast-card">
      <p data-testid={`forecast-date-${index}`}>{unix(forecast.dt).format('MMM D')}</p>
      <div data-testid={`forecast-weather-${index}`}>
        <div data-testid={`weather-icon-${index}`}>WeatherIcon: {forecast.weather[0].icon}</div>
        <div data-testid={`main-temp-${index}`}>
          MainTemperatureDisplay: {forecast.main.temp} {units}
        </div>
        <div data-testid={`weather-description-${index}`}>
          WeatherDescription: {forecast.weather[0].description}
        </div>
      </div>
      <div data-testid={`forecast-stats-${index}`}>
        <span>{Math.round(forecast.pop * 100)}%</span>
        <span>{forecast.main.humidity}%</span>
        <span>{forecast.wind.speed} mph</span>
      </div>
    </div>
  )
}));

jest.mock('../ForecastTransitionWrapper/ForecastTransitionWrapper', () => ({
  ForecastTransition: ({ children, className }: { children: React.ReactNode; className: string }) => (
    <div className={className}>{children}</div>
  ),
}));

jest.mock('../WeeklyForecastSkeletonLoader/WeeklyForecastSkeletonLoader', () => ({
  __esModule: true,
  default: () => <div data-testid="loading-skeleton">Loading...</div>,
}));

jest.mock('../../hooks/queries/useGeolocationQuery');
jest.mock('../../hooks/queries/useWeatherQuery');
jest.mock('../../hooks/useWeather', () => ({
  useWeather: () => ({
    units: 'imperial' as Units,
  }),
}));

describe('WeeklyForecast', () => {
  beforeEach(() => {
    (useGeolocationQuery as jest.Mock).mockReturnValue({
      data: { lat: 40.7128, lng: -74.006 },
    });
  });

  it('displays the loading state', () => {
    (useWeatherQuery as jest.Mock).mockReturnValue({
      isLoading: true,
      data: null,
    });

    renderWithProviders(<WeeklyForecast />);
    expect(screen.getByTestId('loading-skeleton')).toBeInTheDocument();
  });

  it('displays error state when there is an error', () => {
    (useWeatherQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      error: new Error('Failed to fetch weather data'),
      forecast: null,
    });

    renderWithProviders(<WeeklyForecast />);
    expect(screen.getByText('Unable to load forecast')).toBeInTheDocument();
  });

  it('displays error state when forecast is null', () => {
    (useWeatherQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      error: null,
      forecast: null,
    });

    renderWithProviders(<WeeklyForecast />);
    expect(screen.getByText('Unable to load forecast')).toBeInTheDocument();
  });

  it('displays no forecast data available when filtered forecast is empty', () => {
    (useWeatherQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      error: null,
      forecast: [],
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
        wind: {
          speed: 5,
          deg: 180,
        },
        visibility: 10000,
        pop: 0.2,
        sys: { pod: 'd' },
        dt_txt: date.hour(hour).format('YYYY-MM-DD HH:mm:ss'),
      };
    });

    (useWeatherQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      error: null,
      forecast: mockForecast,
    });

    renderWithProviders(<WeeklyForecast />);

    // Check heading
    expect(screen.getByTestId('forecast-heading')).toHaveTextContent('5 Day Forecast');

    // Check number of cards - should be exactly 5 after filtering
    const forecastCards = screen.getAllByTestId(/^forecast-card-\d$/);
    expect(forecastCards).toHaveLength(5);

    // Verify all 5 days are shown
    const today = dayjs();
    for (let i = 0; i < 5; i++) {
      const expectedDate = today.add(i, 'day').format('MMM D');
      expect(screen.getByTestId(`forecast-date-${i}`)).toHaveTextContent(expectedDate);
    }

    // Check details of first card
    const firstCard = screen.getByTestId('forecast-card-0');
    within(firstCard).getByText('WeatherDescription: clear sky');
    within(firstCard).getByText('20%'); // pop percentage
    within(firstCard).getByText('65%'); // humidity
    within(firstCard).getByText('5 mph'); // wind speed
  });
});
