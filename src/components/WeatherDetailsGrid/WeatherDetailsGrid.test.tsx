import { render, screen } from '@testing-library/react';
import WeatherDetailsGrid from './WeatherDetailsGrid';
import { AirQualityDescription, Units } from 'src/types/types';
import { createWeatherDetails } from 'src/util/createWeatherDetails/createWeatherDetails';

// Mock the icons components
jest.mock('../WeatherIcon/WeatherIcon', () => ({
  __esModule: true,
  default: ({ name }: { name: string }) => (
    <div data-testid={`weather-icon-${name}`}>Weather Icon: {name}</div>
  ),
}));

jest.mock('../../icons/ChanceOfRain', () => ({
  __esModule: true,
  default: ({ size }: { size: number }) => (
    <div data-testid="chance-of-rain-icon">ChanceOfRain Icon {size}</div>
  ),
}));

jest.mock('../../icons/Humidity', () => ({
  __esModule: true,
  default: ({ size }: { size: number }) => (
    <div data-testid="humidity-icon">Humidity Icon {size}</div>
  ),
}));

jest.mock('../Icon/Icon', () => ({
  __esModule: true,
  default: ({ name, size }: { name: string; size: number }) => (
    <div data-testid={`icon-${name}`}>
      Icon: {name} {size}
    </div>
  ),
}));

describe('WeatherDetailsGrid', () => {
  const defaultProps = {
    chanceOfPrecip: {
      probability: 30,
      type: 'rain' as const,
      rainAmount: 2,
      snowAmount: 0,
    },
    humidity: 65,
    windSpeed: 10,
    visibility: 10000,
    pressure: 1015,
    airQuality: 'Good' as AirQualityDescription,
    units: 'imperial' as Units,
  };

  it('renders all weather details correctly', () => {
    render(<WeatherDetailsGrid {...defaultProps} />);

    // Check if all weather details are rendered
    const details = createWeatherDetails(defaultProps);
    details.forEach((detail) => {
      expect(screen.getByText(detail.value)).toBeInTheDocument();
      expect(screen.getByText(detail.title)).toBeInTheDocument();
    });
  });

  it('displays correct precipitation type and value', () => {
    render(<WeatherDetailsGrid {...defaultProps} />);
    expect(screen.getByText('Chance of Rain')).toBeInTheDocument();
    expect(screen.getByText('30%')).toBeInTheDocument();

    // Test with snow
    render(
      <WeatherDetailsGrid
        {...defaultProps}
        chanceOfPrecip={{
          probability: 40,
          type: 'snow',
          rainAmount: 0,
          snowAmount: 2,
        }}
      />
    );
    expect(screen.getByText('Chance of Snow')).toBeInTheDocument();
    expect(screen.getByText('40%')).toBeInTheDocument();
  });

  it('formats wind speed according to units', () => {
    // Test imperial units
    render(<WeatherDetailsGrid {...defaultProps} />);
    expect(screen.getByText('10 mph')).toBeInTheDocument();

    // Test metric units
    render(<WeatherDetailsGrid {...defaultProps} units="metric" />);
    expect(screen.getByText('10 m/s')).toBeInTheDocument();
  });

  it('formats pressure according to units', () => {
    // Test imperial units
    render(<WeatherDetailsGrid {...defaultProps} />);
    expect(screen.getByText('1015 inHg')).toBeInTheDocument();

    // Test metric units
    render(<WeatherDetailsGrid {...defaultProps} units="metric" />);
    expect(screen.getByText('1015 hPa')).toBeInTheDocument();
  });

  it('displays air quality status', () => {
    render(<WeatherDetailsGrid {...defaultProps} />);
    expect(screen.getByText('Good')).toBeInTheDocument();

    // Test with different air quality
    render(<WeatherDetailsGrid {...defaultProps} airQuality="Poor" />);
    expect(screen.getByText('Poor')).toBeInTheDocument();
  });

  it('renders with proper grid layout', () => {
    const { container } = render(<WeatherDetailsGrid {...defaultProps} />);
    const gridContainer = container.firstChild;
    expect(gridContainer).toHaveClass('grid', 'grid-cols-3', 'gap-2', 'w-full');
  });

  it('applies correct styling to grid items', () => {
    const { container } = render(<WeatherDetailsGrid {...defaultProps} />);
    const gridItems = container.querySelectorAll('.bg-background');

    gridItems.forEach((item) => {
      expect(item).toHaveClass(
        'rounded-lg',
        'gradient-border',
        'border-primary',
        'flex',
        'flex-col',
        'items-center',
        'justify-between'
      );
    });
  });

  it('renders all icons correctly', () => {
    render(<WeatherDetailsGrid {...defaultProps} />);

    // Check for specific icons
    expect(screen.getByTestId('icon-raindrops')).toBeInTheDocument();
    expect(screen.getByTestId('icon-humidity')).toBeInTheDocument();
    expect(screen.getByTestId('icon-wind_speed')).toBeInTheDocument();
    expect(screen.getByTestId('icon-visibility')).toBeInTheDocument();
    expect(screen.getByTestId('icon-pressure')).toBeInTheDocument();
    expect(screen.getByTestId('icon-air_quality')).toBeInTheDocument();
  });

  describe('edge cases', () => {
    it('handles zero values correctly', () => {
      render(
        <WeatherDetailsGrid
          {...defaultProps}
          humidity={0}
          windSpeed={0}
          visibility={0}
        />
      );

      expect(screen.getByText('0%')).toBeInTheDocument(); // humidity
      expect(screen.getByText('0 mph')).toBeInTheDocument(); // wind speed
    });

    it('handles extremely large values', () => {
      render(
        <WeatherDetailsGrid
          {...defaultProps}
          humidity={100}
          windSpeed={999}
          pressure={9999}
        />
      );

      expect(screen.getByText('100%')).toBeInTheDocument();
      expect(screen.getByText('999 mph')).toBeInTheDocument();
      expect(screen.getByText('9999 inHg')).toBeInTheDocument();
    });
  });
});
