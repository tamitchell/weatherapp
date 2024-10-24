import { render, screen } from '@testing-library/react';
import WeatherDescription from './WeatherDescription';
import '@testing-library/jest-dom';

describe('WeatherDescription', () => {
  it('renders the weather description correctly', () => {
    render(<WeatherDescription description="clear sky" />);
    const descriptionElement = screen.getByTestId('weather-description');
    expect(descriptionElement).toHaveTextContent('clear sky');
  });

  it('capitalizes the weather description', () => {
    render(<WeatherDescription description="partly cloudy" />);
    const descriptionElement = screen.getByTestId('weather-description');
    expect(descriptionElement).toHaveClass('capitalize');
  });
});
