// src/util/generators.test.ts

import { generateMockForecast } from './generators';

describe('generateMockForecast', () => {
  it('generates the correct number of forecast items', () => {
    const forecast = generateMockForecast(
      5,
      [0, 1, 0, 0, 1],
      [0, 0, 0, 0, 0],
      [0.2, 0.5, 0.1, 0.3, 0.65]
    );
    expect(forecast).toHaveLength(5);
  });

  it('correctly applies rain, snow, and pop values', () => {
    const forecast = generateMockForecast(
      5,
      [0, 1, 0, 0, 1],
      [0, 0, 0, 0, 0],
      [0.2, 0.5, 0.1, 0.3, 0.65]
    );

    expect(forecast[0].rain).toBeUndefined();
    expect(forecast[1].rain).toEqual({ '3h': 1 });
    expect(forecast[4].rain).toEqual({ '3h': 1 });

    expect(forecast[0].pop).toBe(0.2);
    expect(forecast[1].pop).toBe(0.5);
    expect(forecast[4].pop).toBe(0.65);
  });

  it('generates correct date-time strings', () => {
    const forecast = generateMockForecast(5);
    forecast.forEach((item) => {
      expect(item.dt_txt).toMatch(/^\d{4}-\d{2}-\d{2} 12:00:00$/);
    });
  });

  it('uses default values when arrays are not provided', () => {
    const forecast = generateMockForecast(3);
    expect(forecast).toHaveLength(3);
    forecast.forEach((item) => {
      expect(item.rain).toBeUndefined();
      expect(item.snow).toBeUndefined();
      expect(item.pop).toBe(0);
    });
  });
});
