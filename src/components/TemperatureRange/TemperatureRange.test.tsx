import React from 'react'
import { render, screen } from '@testing-library/react'
import TemperatureRange from './TemperatureRange'
import { Units } from 'src/types/types'

describe('TemperatureRange Component', () => {
  it('renders the correct temperature values and units (Celsius)', () => {
    const units: Units = 'metric'
    render(<TemperatureRange tempMin={-5} tempMax={35} units={units} />);

    // Check if the low temperature is displayed correctly
    const lowTemp = screen.getByText('-5°C');
    expect(lowTemp).toBeInTheDocument();
    expect(lowTemp).toHaveClass('text-blue-500'); // Check if the correct color is applied

    // Check if the high temperature is displayed correctly
    const highTemp = screen.getByText('35°C');
    expect(highTemp).toBeInTheDocument();
    expect(highTemp).toHaveClass('text-red-500'); // Check if the correct color is applied
  });

  it('renders the correct temperature values and units (Fahrenheit)', () => {
    const units: Units = 'imperial'
    render(<TemperatureRange tempMin={32} tempMax={100} units={units} />);

    // Check if the low temperature is displayed correctly
    const lowTemp = screen.getByText('32°F');
    expect(lowTemp).toBeInTheDocument();
    expect(lowTemp).toHaveClass('text-black'); // No special color for normal temps

    // Check if the high temperature is displayed correctly
    const highTemp = screen.getByText('100°F');
    expect(highTemp).toBeInTheDocument();
    expect(highTemp).toHaveClass('text-red-500'); // High temperature gets red color
  });

  it('renders "LO" and "HI" labels correctly positioned', () => {
    const units: Units = 'metric';
    render(<TemperatureRange tempMin={10} tempMax={20} units={units} />);

    // Check for the presence of "LO" label
    const loLabel = screen.getByTestId('low-temp-label');
    expect(loLabel).toHaveTextContent('LO');

    // Check for the presence of "HI" label
    const hiLabel = screen.getByTestId('high-temp-label');
    expect(hiLabel).toHaveTextContent('HI');

    // Check if "LO" is before the minimum temperature
    const lowTempContainer = screen.getByTestId('low-temp-container');
    const lowTempValue = screen.getByTestId('low-temp-value');
    expect(lowTempContainer).toContainElement(lowTempValue);

    // Check if "HI" is before the maximum temperature
    const highTempContainer = screen.getByTestId('high-temp-container');
    const highTempValue = screen.getByTestId('high-temp-value');
    expect(highTempContainer).toContainElement(highTempValue);

    // Check temperature values
    expect(lowTempValue).toHaveTextContent('10°C');
    expect(highTempValue).toHaveTextContent('20°C');
  });
});