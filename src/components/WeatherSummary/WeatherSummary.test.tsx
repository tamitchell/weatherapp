import { render, screen } from '@testing-library/react';
import WeatherSummary from './WeatherSummary';
import '@testing-library/jest-dom';

// Mock the child components
jest.mock('../FeelsLikeTemperature/FeelsLikeTemperature', () => ({
  __esModule: true,
  default: ({ feelsLike, units }: { feelsLike: number, units: string }) => (
    <span data-testid="mock-feels-like">
      feels like {feelsLike} {units === "imperial" ? "°F" : "°C"}
    </span>
  ),
}));

jest.mock('../WeatherDescription/WeatherDescription', () => ({
  __esModule: true,
  default: ({ description }: { description: string }) => (
    <span data-testid="mock-description">{description}</span>
  ),
}));

jest.mock('../MainTemperatureDisplay/MainTemperatureDisplay', () => ({
  __esModule: true,
  default: ({ temp, units }: { temp: number, units: string }) => (
    <div data-testid="mock-main-temp">
      {temp} {units === "imperial" ? "°F" : "°C"}
    </div>
  ),
}));

describe('WeatherSummary', () => {
  const mockProps = {
    cityName: 'New York',
    mainTemp: 72,
    feelsLike: 70,
    description: 'clear sky',
    units: 'imperial' as const,
  };

  it('renders the correct city name', () => {
    render(<WeatherSummary {...mockProps} />);
    expect(screen.getByText('New York')).toBeInTheDocument();
  });

  it('renders the main temperature', () => {
    render(<WeatherSummary {...mockProps} />);
    const mainTempElement = screen.getByTestId('mock-main-temp');
    expect(mainTempElement).toHaveTextContent('72 °F'); // Testing with imperial units
  });

  it('renders the feels like temperature', () => {
    render(<WeatherSummary {...mockProps} />);
    const feelsLikeElement = screen.getByTestId('mock-feels-like');
    expect(feelsLikeElement).toHaveTextContent('feels like 70 °F');
  });

  it('renders the weather description', () => {
    render(<WeatherSummary {...mockProps} />);
    const descriptionElement = screen.getByTestId('mock-description');
    expect(descriptionElement).toHaveTextContent('clear sky');
  });

  it('renders with metric units', () => {
    const metricProps = { ...mockProps, units: 'metric' as const };
    render(<WeatherSummary {...metricProps} />);
    const mainTempElement = screen.getByTestId('mock-main-temp');
    const feelsLikeElement = screen.getByTestId('mock-feels-like');

    expect(mainTempElement).toHaveTextContent('72 °C');
    expect(feelsLikeElement).toHaveTextContent('feels like 70 °C');
  });
});
