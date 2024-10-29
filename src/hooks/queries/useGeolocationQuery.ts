import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import { useWeather } from '../useWeather';

interface GeolocationData {
  lat: number;
  lng: number;
  address?: string;
}

export const useGeolocationQuery = () => {
  const queryClient = useQueryClient();
  const { setAddress } = useWeather();

  // Query for initial geolocation
  const query = useQuery<GeolocationData, Error>({
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
    staleTime: Infinity,
    retry: false,
    enabled: typeof window !== 'undefined' && Boolean(navigator?.geolocation),
  });

  // Method to update location from Google Places
  const updateLocation = useCallback(
    (newLocation: { lat: number; lng: number; address: string }) => {
      // Update geolocation query data
      queryClient.setQueryData(['geolocation'], newLocation);

      // Update address in Weather context
      setAddress(newLocation.address);

      // Invalidate weather queries to trigger refetch
      queryClient.invalidateQueries({
        queryKey: ['weather'],
      });
    },
    [queryClient, setAddress]
  );

  return {
    ...query,
    updateLocation,
  };
};
