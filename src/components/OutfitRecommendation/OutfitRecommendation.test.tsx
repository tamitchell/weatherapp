import { screen } from '@testing-library/react';
import { useGeolocationQuery } from 'src/hooks/queries/useGeolocationQuery';
import useOutfitRecommendationQuery from 'src/hooks/queries/useOutfitRecommendationQuery';
import useWeatherQuery from 'src/hooks/queries/useWeatherQuery';
import { renderWithProviders } from 'src/test/util';
import OutfitRecommendation from './OutfitRecommendation';

// Mock all the hooks
jest.mock('../../hooks/queries/useGeolocationQuery');
jest.mock('../../hooks/queries/useWeatherQuery');
jest.mock('../../hooks/queries/useOutfitRecommendationQuery');
jest.mock('../../hooks/useWeather', () => ({
  useWeather: () => ({
    units: 'imperial',
  }),
}));

// Mock the Icon component
jest.mock('../Icon/Icon', () => ({
  __esModule: true,
  default: ({ name }: { name: string; size: number; fill?: string }) => (
    <div data-testid={`icon-${name}`}>Mock Icon: {name}</div>
  ),
}));

describe('OutfitRecommendation', () => {
  const mockWeatherData = {
    currentWeather: {
      main: { temp: 75, humidity: 92 },
      weather: [{ description: 'clear sky' }],
    },
    forecast: [],
    isLoading: false,
  };

  const mockOutfitRecommendation = {
    specialNotes:
      'With highs of 76°F, clear skies, and 92% humidity, choose light, breathable clothing. Sunglasses and sunscreen are recommended. A jacket for cooler 64°F evenings may be useful',
  };

  beforeEach(() => {
    jest.clearAllMocks();

    (useGeolocationQuery as jest.Mock).mockReturnValue({
      data: { lat: 40.7128, lng: -74.006 },
    });

    (useWeatherQuery as jest.Mock).mockReturnValue(mockWeatherData);

    (useOutfitRecommendationQuery as jest.Mock).mockReturnValue({
      data: mockOutfitRecommendation,
      isLoading: false,
      error: null,
    });
  });

  it('renders loading skeleton when weather data is loading', () => {
    (useWeatherQuery as jest.Mock).mockReturnValue({
      ...mockWeatherData,
      isLoading: true,
    });

    renderWithProviders(<OutfitRecommendation />);
    expect(
      screen.getByTestId('outfit-recommendation-skeleton')
    ).toBeInTheDocument();
  });

  it('renders loading skeleton when outfit recommendation is loading', () => {
    (useOutfitRecommendationQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    });

    renderWithProviders(<OutfitRecommendation />);
    expect(
      screen.getByTestId('outfit-recommendation-skeleton')
    ).toBeInTheDocument();
  });

  it('renders error message when outfit recommendation fails', () => {
    (useOutfitRecommendationQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error: new Error('Failed to fetch'),
    });

    renderWithProviders(<OutfitRecommendation />);
    expect(
      screen.getByText('Unable to load clothing recommendation')
    ).toBeInTheDocument();
  });

  describe('successful render', () => {
    beforeEach(() => {
      renderWithProviders(<OutfitRecommendation />);
    });

    it('renders the clothing icon button', () => {
      const button = screen.getByRole('button');
      expect(button).toHaveClass(
        'bg-black',
        'rounded-md',
        'w-[4em]',
        'h-[4em]',
        'self-start',
        'p-4'
      );

      const icon = screen.getByTestId('icon-tshirt');
      expect(icon).toBeInTheDocument();
    });

    it('renders the title and recommendation text', () => {
      expect(screen.getByText("Today's clothing tip...")).toHaveClass(
        'font-medium',
        'text-lg',
        'italic',
        'mb-2'
      );
      expect(
        screen.getByText(mockOutfitRecommendation.specialNotes)
      ).toHaveClass('text-gray-800');
    });

    it('has correct layout structure', () => {
      const container = screen.getByTestId('outfit-recommendation');
      expect(container).toHaveClass(
        'bg-white',
        'p-4',
        'rounded-md',
        'text-black',
        'flex',
        'flex-row',
        'items-start',
        'gap-4'
      );
    });
  });

  //   it('does not make outfit recommendation query when weather data is missing', () => {
  //     (useWeatherQuery as jest.Mock).mockReturnValue({
  //       currentWeather: null,
  //       forecast: null,
  //       isLoading: false,
  //     });

  //     renderWithProviders(<OutfitRecommendation />);

  //     expect(useOutfitRecommendationQuery).toHaveBeenCalledWith(
  //       expect.anything(),
  //       expect.objectContaining({
  //         enabled: false,
  //       })
  //     );
  //   });
});
