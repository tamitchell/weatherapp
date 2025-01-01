import { screen } from '@testing-library/react';
import { useGeolocationQuery } from 'src/hooks/queries/useGeolocationQuery';
import useWeatherQuery from 'src/hooks/queries/useWeatherQuery';
import { renderWithProviders } from 'src/test/util';
import OutfitRecommendation from '../OutfitRecommendationWrapper/OutfitRecommendationWrapper';
import { MotionComponentProps } from 'src/types/types';
import { ReactNode } from 'react';
import useOutfitRecommendationQuery from 'src/hooks/queries/useOutfitRecommendationQuery/useOutfitRecommendationQuery';

// Mock all the hooks
jest.mock('../../hooks/queries/useGeolocationQuery');
jest.mock('../../hooks/queries/useWeatherQuery');
jest.mock(
  '../../hooks/queries/useOutfitRecommendationQuery/useOutfitRecommendationQuery'
);
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

//mock fraemr
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: MotionComponentProps) => (
      <div {...props}>{children}</div>
    ),
    button: ({ children, ...props }: MotionComponentProps) => (
      <button {...props}>{children}</button>
    ),
    h3: ({ children, ...props }: MotionComponentProps) => (
      <h3 {...props}>{children}</h3>
    ),
    span: ({
      children,
      className,
      initial,
      'data-testid': dataTestId,
    }: MotionComponentProps) => (
      <span className={className} style={initial} data-testid={dataTestId}>
        {children}
      </span>
    ),
  },
  AnimatePresence: ({ children }: { children: ReactNode }) => <>{children}</>,
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
    recommendation:
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

    it('renders the recommendation text with animation wrapper', () => {
      const recommendation = mockOutfitRecommendation.recommendation;
      const words = recommendation.split(' ');

      words.forEach((word, index) => {
        const wordElement = screen.getByTestId(`word-${index}`);
        expect(wordElement).toBeInTheDocument();
        expect(wordElement).toHaveTextContent(word);
        expect(wordElement).toHaveStyle({ opacity: 0 });
      });
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
});
