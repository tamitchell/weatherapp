import { screen } from '@testing-library/react';
import { renderWithProviders } from 'src/test/util';
import OutfitRecommendationWrapper from './OutfitRecommendationWrapper';
import { useGeolocationQuery } from 'src/hooks/queries/useGeolocationQuery';
import useWeatherQuery from 'src/hooks/queries/useWeatherQuery';

// Mock hooks
jest.mock('../../hooks/queries/useGeolocationQuery');
jest.mock('../../hooks/queries/useWeatherQuery');
jest.mock('../../hooks/useWeather', () => ({
  useWeather: () => ({
    units: 'imperial',
  }),
}));

// Mock icon
jest.mock('../Icon/Icon', () => ({
  __esModule: true,
  default: ({ name }: { name: string; size: number; fill?: string }) => (
    <div data-testid={`icon-${name}`}>Mock Icon: {name}</div>
  ),
}));

describe('OutfitRecommendationWrapper', () => {
  const mockWeatherData = {
    currentWeather: {
      main: { temp: 75, humidity: 92 },
      weather: [{ description: 'clear sky' }],
    },
    forecast: [],
    isLoading: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();

    (useGeolocationQuery as jest.Mock).mockReturnValue({
      data: { lat: 40.7128, lng: -74.006 },
    });

    (useWeatherQuery as jest.Mock).mockReturnValue(mockWeatherData);
  });

  it('renders loading skeleton when weather data is loading', () => {
    (useWeatherQuery as jest.Mock).mockReturnValue({
      ...mockWeatherData,
      isLoading: true,
    });

    renderWithProviders(<OutfitRecommendationWrapper />);
    expect(
      screen.getByTestId('outfit-recommendation-wrapper-skeleton')
    ).toBeInTheDocument();
  });

  it('renders error message when weather fails', () => {
    (useWeatherQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error: new Error('Failed to fetch'),
    });

    renderWithProviders(<OutfitRecommendationWrapper />);
    expect(
      screen.getByText('Unable to load clothing recommendation')
    ).toBeInTheDocument();
  });

  it('renders the OutfitRecommendation component when data is available', () => {
    renderWithProviders(<OutfitRecommendationWrapper />);
    expect(screen.getByTestId('outfit-recommendation')).toBeInTheDocument();
  });
});
