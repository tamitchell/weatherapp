import { useQuery } from '@tanstack/react-query';

interface GeolocationData {
  lat: number;
  lng: number;
}

export const useGeolocationQuery = () => {
  return useQuery<GeolocationData, Error>({
    queryKey: ['geolocation'],
    queryFn: async () => {
      return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
          reject(new Error('Geolocation is not supported'));
          return;
        }

        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          (error) => {
            reject(new Error(error.message));
          }
        );
      });
    },
    staleTime: Infinity, // Don't refetch automatically
    retry: false, // Don't retry if user denies permission
    enabled: typeof window !== 'undefined' && Boolean(navigator?.geolocation),
  });
};
