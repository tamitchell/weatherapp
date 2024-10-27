export const useWeather = jest.fn(() => ({
  units: 'imperial',
  setUnits: jest.fn(),
  address: null,
  setAddress: jest.fn(),
}));
