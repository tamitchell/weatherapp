import { render, screen } from "@testing-library/react";
import DayWeatherStats from "./DayWeatherStats";

// Mock the Icon component
jest.mock('../Icon/Icon', () => ({
  __esModule: true,
  default: ({ name }: { name: string }) => <div data-testid={`icon-${name}`}>{`Mock Icon: ${name}`}</div>
}));


describe('WeatherStats', () => {
  const commonProps = {
    pop: 0.2,
    humidity: 65,
    windSpeed: 5,
    units: 'imperial' as const,
  };

  it('renders rain icon when precipType is rain', () => {
    render(<DayWeatherStats {...commonProps} precipType="rain" />);
    expect(screen.getByTestId('icon-raindrops')).toBeInTheDocument();
    expect(screen.queryByTestId('icon-snowflake')).not.toBeInTheDocument();
  });

  it('renders snow icon when precipType is snow', () => {
    render(<DayWeatherStats {...commonProps} precipType="snow" />);
    expect(screen.getByTestId('icon-snowflake')).toBeInTheDocument();
    expect(screen.queryByTestId('icon-raindrops')).not.toBeInTheDocument();
  });

  it('renders rain icon when precipType is none (default behavior)', () => {
    render(<DayWeatherStats {...commonProps} precipType="none" />);
    expect(screen.getByTestId('icon-raindrops')).toBeInTheDocument();
    expect(screen.queryByTestId('icon-snowflake')).not.toBeInTheDocument();
  });

  it('renders correct precipitation percentage', () => {
    render(<DayWeatherStats {...commonProps} precipType="rain" />);
    expect(screen.getByText('20%')).toBeInTheDocument();
  });

  it('renders correct humidity', () => {
    render(<DayWeatherStats {...commonProps} precipType="rain" />);
    expect(screen.getByText('65%')).toBeInTheDocument();
  });

  it('renders correct wind speed for imperial units', () => {
    render(<DayWeatherStats {...commonProps} precipType="rain" />);
    expect(screen.getByText('5 mph')).toBeInTheDocument();
  });

  it('renders correct wind speed for metric units', () => {
    render(<DayWeatherStats {...commonProps} precipType="rain" units="metric" />);
    expect(screen.getByText('5 m/s')).toBeInTheDocument();
  });
});