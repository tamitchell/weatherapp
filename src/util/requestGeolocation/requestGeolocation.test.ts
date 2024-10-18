import { GeolocationOptions, requestGeolocation } from "./requestGeolocation";
describe('requestGeolocation', () => {
    const mockGeolocation = {
      getCurrentPosition: jest.fn()
    };
  
    beforeEach(() => {
      Object.defineProperty(global, 'navigator', {
        value: {
          geolocation: mockGeolocation
        },
        writable: true
      });
    });
  
    afterEach(() => {
      jest.resetAllMocks();
    });
  
    it('should resolve with a position when geolocation is successful', async () => {
      const mockPosition: GeolocationPosition = {
        coords: {
          latitude: 51.507351,
          longitude: -0.127758,
          accuracy: 10,
          altitude: null,
          altitudeAccuracy: null,
          heading: null,
          speed: null
        },
        timestamp: 1627846200000
      };
  
      mockGeolocation.getCurrentPosition.mockImplementation((successCallback) => {
        successCallback(mockPosition);
      });
  
      const result = await requestGeolocation();
      expect(result).toEqual(mockPosition);
    });
  
    it('should reject when geolocation is not supported', async () => {
      Object.defineProperty(global, 'navigator', {
        value: {},
        writable: true
      });
  
      await expect(requestGeolocation()).rejects.toThrow('Geolocation is not supported by this browser.');
    });
  
    it('should reject when permission is denied', async () => {
      mockGeolocation.getCurrentPosition.mockImplementation((_, errorCallback) => {
        errorCallback({ code: 1, PERMISSION_DENIED: 1 } as GeolocationPositionError);
      });
  
      await expect(requestGeolocation()).rejects.toThrow('Location access denied by the user.');
    });
  
    it('should reject when position is unavailable', async () => {
      mockGeolocation.getCurrentPosition.mockImplementation((_, errorCallback) => {
        errorCallback({ code: 2, POSITION_UNAVAILABLE: 2 } as GeolocationPositionError);
      });
  
      await expect(requestGeolocation()).rejects.toThrow('Location information is unavailable.');
    });
  
    it('should reject when request times out', async () => {
      mockGeolocation.getCurrentPosition.mockImplementation((_, errorCallback) => {
        errorCallback({ code: 3, TIMEOUT: 3 } as GeolocationPositionError);
      });
  
      await expect(requestGeolocation()).rejects.toThrow('Geolocation request timed out.');
    });
  
    it('should reject with unknown error for other error codes', async () => {
      mockGeolocation.getCurrentPosition.mockImplementation((_, errorCallback) => {
        errorCallback({ code: 4 } as GeolocationPositionError);
      });
  
      await expect(requestGeolocation()).rejects.toThrow('An unknown geolocation error occurred.');
    });
  
    it('should use provided options', async () => {
      mockGeolocation.getCurrentPosition.mockImplementation((successCallback) => {
        successCallback({} as GeolocationPosition);
      });
  
      const options: GeolocationOptions = {
        enableHighAccuracy: false,
        timeout: 5000,
        maximumAge: 1000
      };
  
      await requestGeolocation(options);
  
      expect(mockGeolocation.getCurrentPosition).toHaveBeenCalledWith(
        expect.any(Function),
        expect.any(Function),
        expect.objectContaining(options)
      );
    });
  });