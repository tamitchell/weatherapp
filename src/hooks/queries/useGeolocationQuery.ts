import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import { useWeather } from '../useWeather';
import { fetchCurrentWeather, fetchForecast } from 'src/util/api/weatherCalls';

interface GeolocationData {
  lat: number;
  lng: number;
  address?: string;
}

export const useGeolocationQuery = () => {
  const queryClient = useQueryClient();
  const { units } = useWeather(); 

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
    gcTime: Infinity,
    retry: false,
    enabled: typeof window !== 'undefined' && Boolean(navigator?.geolocation),
  });

const updateLocation = useCallback(async (newLocation: GeolocationData) => {
    queryClient.setQueryData(['geolocation'], newLocation);
    
    await Promise.all([
      queryClient.prefetchQuery({
        queryKey: ['weather', 'current', { ...newLocation, units }],
        queryFn: () => fetchCurrentWeather(newLocation.lat, newLocation.lng, units)
      }),
      queryClient.prefetchQuery({
        queryKey: ['weather', 'forecast', { ...newLocation, units }],
        queryFn: () => fetchForecast(newLocation.lat, newLocation.lng, units)
      })
    ]);

    // Invalidate the queries to trigger the UI update
    await queryClient.invalidateQueries({
      queryKey: ['weather']
    });
  }, [queryClient, units]);

  return {
    ...query,
    updateLocation,
  };
};
