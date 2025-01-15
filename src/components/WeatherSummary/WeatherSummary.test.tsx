import { render } from '@testing-library/react';
import WeatherSummary from './WeatherSummary';

const mockMainTemperatureDisplay = jest.fn();
const mockFeelsLikeTemperature = jest.fn();
const mockWeatherDescription = jest.fn();

jest.mock('../MainTemperatureDisplay/MainTemperatureDisplay', () => ({
  __esModule: true,
  default: (props: { temp: number; units: string }) => {
    mockMainTemperatureDisplay(props);
    return (
      <div data-testid="mock-main-temp">
        {props.temp} {props.units === 'imperial' ? '°F' : '°C'}
      </div>
    );
  },
}));

jest.mock('../FeelsLikeTemperature/FeelsLikeTemperature', () => ({
  __esModule: true,
  default: (props: { feelsLike: number; units: string }) => {
    mockFeelsLikeTemperature(props);
    return (
      <span data-testid="mock-feels-like">
        feels like {props.feelsLike} {props.units === 'imperial' ? '°F' : '°C'}
      </span>
    );
  },
}));

jest.mock('../WeatherDescription/WeatherDescription', () => ({
  __esModule: true,
  default: (props: { description: string }) => {
    mockWeatherDescription(props);
    return <span data-testid="mock-description">{props.description}</span>;
  },
}));

describe('WeatherSummary - Data Flow', () => {
  const mockProps = {
    cityName: 'New York',
    mainTemp: 72,
    feelsLike: 70,
    description: 'clear sky',
    units: 'imperial' as const,
  };

  beforeEach(() => {
    mockMainTemperatureDisplay.mockClear();
    mockFeelsLikeTemperature.mockClear();
    mockWeatherDescription.mockClear();
  });

  it('passes the correct data to MainTemperatureDisplay', () => {
    render(<WeatherSummary {...mockProps} />);
    expect(mockMainTemperatureDisplay).toHaveBeenCalledWith({
      temp: 72,
      units: 'imperial',
      className: expect.any(String),
    });
  });

  it('passes the correct data to FeelsLikeTemperature', () => {
    render(<WeatherSummary {...mockProps} />);
    expect(mockFeelsLikeTemperature).toHaveBeenCalledWith(
      expect.objectContaining({
        feelsLike: 70,
        units: 'imperial',
        className: expect.any(String),
      })
    );
  });

  it('passes the correct data to WeatherDescription', () => {
    render(<WeatherSummary {...mockProps} />);
    expect(mockWeatherDescription).toHaveBeenCalledWith(
      expect.objectContaining({
        description: 'clear sky',
        className: expect.any(String),
      })
    );
  });

  it('correctly transforms data for metric units', () => {
    const metricProps = { ...mockProps, units: 'metric' as const };

    render(<WeatherSummary {...metricProps} />);

    expect(mockMainTemperatureDisplay).toHaveBeenCalledWith({
      temp: 72,
      units: 'metric',
      className: expect.any(String),
    });

    expect(mockFeelsLikeTemperature).toHaveBeenCalledWith({
      feelsLike: 70,
      units: 'metric',
      className: expect.any(String),
    });
  });
});
