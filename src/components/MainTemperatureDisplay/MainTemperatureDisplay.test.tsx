import { render, screen } from '@testing-library/react';
import MainTemperatureDisplay from './MainTemperatureDisplay';
describe('Main Temperature', () => {
  it('renders the correct imperial units', () => {
    render(<MainTemperatureDisplay temp={68} units={'imperial'} />);
    const tempElement = screen.getByTestId('main-temp');
    expect(tempElement).toHaveTextContent('68°F');
  });
  it('renders the correct metric units', () => {
    render(<MainTemperatureDisplay temp={20} units={'metric'} />);
    const tempElement = screen.getByTestId('main-temp');
    expect(tempElement).toHaveTextContent('20°C');
  });
  it('rounds the temp to the nearest integer', () => {
    render(<MainTemperatureDisplay temp={20.6} units={'metric'} />);
    const tempElement = screen.getByTestId('main-temp');
    expect(tempElement).toHaveTextContent('21°C');
  });
  it('handles negative temperatures', () => {
    render(<MainTemperatureDisplay temp={-5.4} units="metric" />);
    const tempElement = screen.getByTestId('main-temp');
    expect(tempElement).toHaveTextContent('-5°C');
  });
  it('handles zero temperature', () => {
    render(<MainTemperatureDisplay temp={0} units="imperial" />);
    const tempElement = screen.getByTestId('main-temp');
    expect(tempElement).toHaveTextContent('0°F');
  });
});
