export interface GeolocationOptions {
    enableHighAccuracy?: boolean;
    timeout?: number;
    maximumAge?: number;
  }
  
  export function requestGeolocation(options: GeolocationOptions = {}): Promise<GeolocationPosition> {
    const defaultOptions: GeolocationOptions = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
    };
  
    const mergedOptions = { ...defaultOptions, ...options };
  
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported by this browser.'));
        return;
      }
  
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          resolve(position);
        },
        (error: GeolocationPositionError) => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              reject(new Error('Location access denied by the user.'));
              break;
            case error.POSITION_UNAVAILABLE:
              reject(new Error('Location information is unavailable.'));
              break;
            case error.TIMEOUT:
              reject(new Error('Geolocation request timed out.'));
              break;
            default:
              reject(new Error('An unknown geolocation error occurred.'));
          }
        },
        mergedOptions
      );
    });
  }