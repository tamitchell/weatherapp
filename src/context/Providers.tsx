'use client';

import { ReactNode, useEffect, useMemo, useState } from 'react';
import { WeatherProvider } from './WeatherProvider';
import { SnackbarProvider } from 'notistack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { persistQueryClient } from '@tanstack/react-query-persist-client';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import { ThemeProvider } from './ThemeProvider/ThemeProvider';
import { DEFAULT_NY_LAT, DEFAULT_NY_LNG } from 'src/data/defaultData';
import { useGeolocationQuery } from 'src/hooks/queries/useGeolocationQuery';
import useWeatherQuery from 'src/hooks/queries/useWeatherQuery';
import { useWeather } from 'src/hooks/useWeather';

function WeatherDataProvider({ children }: { children: ReactNode }) {
  const { units } = useWeather();
  const { data: location } = useGeolocationQuery();
  
  const { currentWeather } = useWeatherQuery({
    lat: location?.lat ?? DEFAULT_NY_LAT,
    lng: location?.lng ?? DEFAULT_NY_LNG,
    units,
  });

  return (
    <ThemeProvider weatherData={currentWeather}>
      {children}
    </ThemeProvider>
  );
}

// This component wraps all client-side providers
export default function Providers({ children }: { children: ReactNode }) {
  //OpenWeather updates their states every 10 minutes
  const queryClient = useMemo(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5, // 5 minutes
            gcTime: 1000 * 60 * 10, // 10 minutes
            retry: 2,
            retryDelay: 1000,
          },
        },
      }),
    []
  );
  //For some reason persister can be undefined so must check for state before using
  const [persister] = useState(() =>
    typeof window !== 'undefined'
      ? createSyncStoragePersister({
          storage: window.localStorage,
          key: 'weather-cache',
        })
      : null
  );

  useEffect(() => {
    if (persister) {
      persistQueryClient({
        queryClient,
        persister,
        maxAge: 1000 * 60 * 60 * 24,
        buster: 'v1',
      });
    }
  }, [persister, queryClient]);

  return (
    <QueryClientProvider client={queryClient}>
      <SnackbarProvider>
      <WeatherProvider>
          <WeatherDataProvider>
            {children}
          </WeatherDataProvider>
        </WeatherProvider>
      </SnackbarProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
