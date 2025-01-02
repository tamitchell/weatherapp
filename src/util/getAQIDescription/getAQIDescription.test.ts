import { AirQualityIndex } from "src/types/types";
import getAirQualityDescription from "./getAQIDescription";

describe('getAirQualityDescription', () => {
    it('returns "Good" for AQI value 1', () => {
      expect(getAirQualityDescription(AirQualityIndex.Good)).toBe('Good');
    });
  
    it('returns "Fair" for AQI value 2', () => {
      expect(getAirQualityDescription(AirQualityIndex.Fair)).toBe('Fair');
    });
  
    it('returns "Moderate" for AQI value 3', () => {
      expect(getAirQualityDescription(AirQualityIndex.Moderate)).toBe('Moderate');
    });
  
    it('returns "Poor" for AQI value 4', () => {
      expect(getAirQualityDescription(AirQualityIndex.Poor)).toBe('Poor');
    });
  
    it('returns "Very Poor" for AQI value 5', () => {
      expect(getAirQualityDescription(AirQualityIndex.VeryPoor)).toBe('Very Poor');
    });
  
    it('returns "Unknown AQI level" for invalid AQI values', () => {
      // Test with invalid numbers
      expect(getAirQualityDescription(0)).toBe('Unknown AQI level');
      expect(getAirQualityDescription(6)).toBe('Unknown AQI level');
      expect(getAirQualityDescription(-1)).toBe('Unknown AQI level');
    });
  
    // Test with non-numeric values that might be passed
    it('handles non-numeric inputs gracefully', () => {
      // @ts-expect-error Testing invalid input
      expect(getAirQualityDescription(undefined)).toBe('Unknown AQI level');
      // @ts-expect-error Testing invalid input
      expect(getAirQualityDescription(null)).toBe('Unknown AQI level');
      // @ts-expect-error Testing invalid input
      expect(getAirQualityDescription('1')).toBe('Unknown AQI level');
    });
  });