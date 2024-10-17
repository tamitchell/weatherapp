import { render, screen } from '@testing-library/react';
import WeeklyForecast from './WeeklyForecast';
import { generateMockForecast } from 'src/util/generators';
import { Units } from 'src/types/types';

jest.mock('../WeatherIcon/WeatherIcon', () => ({
    __esModule: true,
    default: ({ name, index }: { name: string; index: number }) => (
      <div data-testid={`weather-icon-${index}`}>WeatherIcon: {name}</div>
    ),
  }));
  
  jest.mock('../MainTemperatureDisplay/MainTemperatureDisplay', () => ({
    __esModule: true,
    default: ({ temp, units, index }: { temp: number; units: Units; index: number }) => (
      <div data-testid={`main-temp-${index}`}>{`MainTemperatureDisplay: ${temp} ${units}`}</div>
    ),
  }));
  
  jest.mock('../WeatherDescription/WeatherDescription', () => ({
    __esModule: true,
    default: ({ description, index }: { description: string; index: number }) => (
      <div data-testid={`weather-description-${index}`}>{`WeatherDescription: ${description}`}</div>
    ),
  }));
  
  
  jest.mock('../TemperatureRange/TemperatureRange', () => ({
    __esModule: true,
    default: () => <div data-testid="temperature-range">TemperatureRange</div>,
  }));
  
  jest.mock('../Icon/Icon', () => ({
    __esModule: true,
    default: ({ name }: { name: string }) => <div data-testid={`icon-${name}`}>{name} Icon</div>,
  }));
  
  jest.mock('../WeeklyForecastSkeletonLoader/WeeklyForecastSkeletonLoader', () => ({
    __esModule: true,
    default: () => <div data-testid="loading-skeleton">Loading...</div>,
  }));
  

  const mockForecast = generateMockForecast(5, [0, 1, 0, 0, 1], [0, 0, 0, 0, 0], [0.2, 0.5, 0.1, 0.3, 0.65]);

describe('WeeklyForecast', () => {
  it('displays the loading state when isLoading is true', () => {
    render(<WeeklyForecast forecast={[]} units="imperial" isLoading={true} />);
    expect(screen.getByTestId('loading-skeleton')).toBeInTheDocument();
  });

  it('renders the correct number of forecast cards when data is available', () => {
    render(<WeeklyForecast forecast={mockForecast} units="imperial" isLoading={false} />);
    
    // Check that 5 forecast cards are rendered
    expect(screen.getAllByTestId(/forecast-card-/)).toHaveLength(mockForecast.length);  // Matching by regex
    expect(screen.getAllByTestId(/weather-icon-/)).toHaveLength(mockForecast.length);  // Matching by regex
    expect(screen.getAllByTestId(/main-temp-/)).toHaveLength(mockForecast.length);  // Matching by regex
  });

  it('correctly applies the data transformation logic (filterForecastByUserTime)', () => {
    render(<WeeklyForecast forecast={mockForecast} units="imperial" isLoading={false} />);

    // Check for specific entries based on the transformation logic
    expect(screen.getByText((content, element) => element?.tagName.toLowerCase() === 'p' && content.includes('Dec'))).toBeInTheDocument();  // Example date based on the mock forecast    expect(screen.getByText('Clear sky')).toBeInTheDocument(); // Example weather description
    expect(screen.getByText('Partly cloudy')).toBeInTheDocument(); // Another weather description
  });

  it('displays precipitation, humidity, and wind speed correctly', () => {
    render(<WeeklyForecast forecast={mockForecast} units="imperial" isLoading={false} />);

    // Check that the correct percentage of precipitation is displayed
    expect(screen.getByText('20%')).toBeInTheDocument(); // For example, based on mock forecast data
    expect(screen.getByText('65%')).toBeInTheDocument(); // Humidity example
    expect(screen.getByText('5 mph')).toBeInTheDocument(); // Wind speed example
  });
});
