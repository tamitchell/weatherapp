import getPrecipitationForecast from './getPrecipitationForecast';
import { generateMockForecast } from '../generators';
import { ForecastItem, PrecipitationForecast } from 'src/types/types';
describe('getPrecipitationForecast', () => {
  it('should return no precipitation when there is no rain or snow', () => {
    const forecast: ForecastItem[] = generateMockForecast(
      8,
      [],
      [],
      [0.1, 0.2]
    );

    const result: PrecipitationForecast = getPrecipitationForecast(forecast);
    expect(result).toEqual({
      probability: 20,
      type: 'none',
      rainAmount: 0,
      snowAmount: 0,
    });
  });

  it('should return rain precipitation when there is rain in the forecast', () => {
    const forecast: ForecastItem[] = generateMockForecast(
      8,
      [2, 3],
      [],
      [0.1, 0.5]
    );

    const result: PrecipitationForecast = getPrecipitationForecast(forecast);
    expect(result).toEqual({
      probability: 50,
      type: 'rain',
      rainAmount: 5, // 2 + 3
      snowAmount: 0,
    });
  });

  it('should return snow precipitation when there is snow in the forecast', () => {
    const forecast: ForecastItem[] = generateMockForecast(
      8,
      [],
      [4, 2],
      [0.2, 0.6]
    );

    const result: PrecipitationForecast = getPrecipitationForecast(forecast);
    expect(result).toEqual({
      probability: 60,
      type: 'snow',
      rainAmount: 0,
      snowAmount: 6, // 4 + 2
    });
  });

  it('should return rain when both rain and snow are present but rain is higher', () => {
    const forecast: ForecastItem[] = generateMockForecast(
      8,
      [5, 2],
      [2, 3],
      [0.4, 0.8]
    );

    const result: PrecipitationForecast = getPrecipitationForecast(forecast);
    expect(result).toEqual({
      probability: 80,
      type: 'rain',
      rainAmount: 7, // 5 + 2
      snowAmount: 5, // 2 + 3
    });
  });

  it('should return snow when both rain and snow are present but snow is higher', () => {
    const forecast: ForecastItem[] = generateMockForecast(
      8,
      [1, 2],
      [4, 6],
      [0.3, 0.9]
    );

    const result: PrecipitationForecast = getPrecipitationForecast(forecast);
    expect(result).toEqual({
      probability: 90,
      type: 'snow',
      rainAmount: 3, // 1 + 2
      snowAmount: 10, // 4 + 6
    });
  });
});
