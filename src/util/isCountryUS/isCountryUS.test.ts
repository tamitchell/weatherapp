import { isCountryUS } from './isCountryUS';

describe('isCountryUS', () => {
  it('should return true for coordinates within the continental US', () => {
    expect(isCountryUS(40.7128, -74.006)).toBe(true); // New York City
    expect(isCountryUS(34.0522, -118.2437)).toBe(true); // Los Angeles
    expect(isCountryUS(41.8781, -87.6298)).toBe(true); // Chicago
    expect(isCountryUS(25.7617, -80.1918)).toBe(true); // Miami
    expect(isCountryUS(47.6062, -122.3321)).toBe(true); // Seattle
  });

  it('should return true for coordinates within Alaska', () => {
    expect(isCountryUS(61.2181, -149.9003)).toBe(true); // Anchorage
    expect(isCountryUS(64.8378, -147.7164)).toBe(true); // Fairbanks
  });

  it('should return true for coordinates within Hawaii', () => {
    expect(isCountryUS(21.3069, -157.8583)).toBe(true); // Honolulu
    expect(isCountryUS(20.7967, -156.3319)).toBe(true); // Maui
    expect(isCountryUS(19.5429, -155.6659)).toBe(true); // Hawaii (Big Island)
  });

  it('should return false for coordinates outside the US', () => {
    expect(isCountryUS(51.5074, -0.1278)).toBe(false); // London
    expect(isCountryUS(35.6762, 139.6503)).toBe(false); // Tokyo
    expect(isCountryUS(19.4326, -99.1332)).toBe(false); // Mexico City
    expect(isCountryUS(52.3676, 4.9041)).toBe(false); // Amsterdam
    expect(isCountryUS(-33.8688, 151.2093)).toBe(false); // Sydney
  });

  it('should handle edge cases', () => {
    expect(isCountryUS(49.0, -123.0)).toBe(true); // Near Vancouver, but just inside US bounding box
    expect(isCountryUS(49.4, -123.0)).toBe(false); // Just north of US bounding box
    expect(isCountryUS(32.0, -117.0)).toBe(true); // San Diego area
    expect(isCountryUS(18.0, -155.0)).toBe(false); // Just south of Hawaii bounding box
  });
});
