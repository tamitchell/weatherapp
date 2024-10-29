import { render, screen } from '@testing-library/react';
import FeelsLikeTemperature from './FeelsLikeTemperature';
import '@testing-library/jest-dom';

describe('FeelsLikeTemperature', () => {
  it('renders the feels like temperature in imperial units', () => {
    render(<FeelsLikeTemperature feelsLike={70} units="imperial" />);
    const feelsLikeElement = screen.getByTestId('feels-like');
    expect(feelsLikeElement).toHaveTextContent('feels like 70°F');
  });

  it('renders the feels like temperature in metric units', () => {
    render(<FeelsLikeTemperature feelsLike={21} units="metric" />);
    const feelsLikeElement = screen.getByTestId('feels-like');
    expect(feelsLikeElement).toHaveTextContent('feels like 21°C');
  });
});
