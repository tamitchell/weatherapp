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
  const mockProps = {
    currentWeather: {
      main: { temp: 75, humidity: 60 },
      weather: [{ description: 'clear sky' }],
    },
    forecast: [],
    units: 'imperial' as const,
    chanceOfPrecip: {
      probability: 0,
      type: 'none' as const,
      rainAmount: 0,
      snowAmount: 0,
    },
  };
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

  it('renders all core elements correctly', () => {
    renderWithProviders(<OutfitRecommendation {...mockProps} />);

    // Check for the heading
    expect(screen.getByText("Today's Clothing Tip")).toBeInTheDocument();

    // Check for the clothing icon button
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(screen.getByTestId('icon-tshirt')).toBeInTheDocument();

    // Confirm the recommendation text is displayed
    expect(
      screen.getByText(mockOutfitRecommendation.recommendation)
    ).toBeInTheDocument();
  });

  it('maintains proper layout structure', () => {
    renderWithProviders(<OutfitRecommendation {...mockProps} />);

    // Check main container has proper structure
    const container = screen.getByTestId('outfit-recommendation');
    expect(container).toHaveClass(
      'rounded-md',
      'flex',
      'flex-row',
      'items-center',
      'gap-4',
      'p-4'
    );
  });

  it('renders loading state correctly', () => {
    (useOutfitRecommendationQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    });

    renderWithProviders(<OutfitRecommendation {...mockProps} />);
    expect(
      screen.getByTestId('outfit-recommendation-skeleton')
    ).toBeInTheDocument();
  });

  it('renders error state correctly', () => {
    (useOutfitRecommendationQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error: new Error('Failed to fetch'),
    });

    renderWithProviders(<OutfitRecommendation {...mockProps} />);
    expect(
      screen.getByText('Unable to load clothing recommendation')
    ).toBeInTheDocument();
  });
});
