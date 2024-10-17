import { weatherIconMap } from "src/data/iconMap";
import WeatherIcon from "./WeatherIcon";
import { render } from "@testing-library/react";

// Mock the weatherIconMap
jest.mock('../../data/iconMap', () => ({
    weatherIconMap: {
      '01d': jest.fn(() => <svg data-testid="mock-svg">Sunny</svg>),
      '10n': jest.fn(() => <svg data-testid="mock-svg">Rainy Night</svg>),
    },
    WeatherIconName: {
      '01d': '01d',
      '10n': '10n',
    }
  }));
  
  describe('WeatherIcon', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
  
   
    it('applies default size', () => {
        render(<WeatherIcon name="01d" />);
        expect(weatherIconMap['01d']).toHaveBeenCalledWith(
          expect.objectContaining({
            width: 24,
            height: 24,
          }),
          expect.anything() // This accounts for the second argument (empty object)
        );
      });
      
      it('applies custom size', () => {
        render(<WeatherIcon name="01d" size={32} />);
        expect(weatherIconMap['01d']).toHaveBeenCalledWith(
          expect.objectContaining({
            width: 32,
            height: 32,
          }),
          expect.anything() // This accounts for the second argument (empty object)
        );
      });
      
      it('applies default fill and stroke colors', () => {
        render(<WeatherIcon name="01d" />);
        expect(weatherIconMap['01d']).toHaveBeenCalledWith(
          expect.objectContaining({
            fill: 'currentColor',
            stroke: 'currentColor',
          }),
          expect.anything() // This accounts for the second argument (empty object)
        );
      });
      
      it('applies custom fill and stroke colors', () => {
        render(<WeatherIcon name="10n" fill="blue" stroke="red" />);
        expect(weatherIconMap['10n']).toHaveBeenCalledWith(
          expect.objectContaining({
            fill: 'blue',
            stroke: 'red',
          }),
          expect.anything() // This accounts for the second argument (empty object)
        );
      });
      
      it('passes through additional props', () => {
        render(<WeatherIcon name="01d" data-testid="custom-testid" />);
        expect(weatherIconMap['01d']).toHaveBeenCalledWith(
          expect.objectContaining({
            'data-testid': 'custom-testid',
          }),
          expect.anything() // This accounts for the second argument (empty object)
        );
      });
      
  });