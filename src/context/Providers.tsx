'use client'; // This is a client-side component

import { ReactNode } from 'react';
import { WeatherProvider } from './WeatherProvider';
import { SnackbarProvider } from 'notistack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// This component wraps all client-side providers
export default function Providers({ children }: { children: ReactNode }) {
  //OpenWeather updates their states every 10 minutes
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // Conservative for no... queries can override
        staleTime: 1000 * 60 * 5, // 5 minutes
        gcTime: 1000 * 60 * 10, // 10 minutes
        retry: 2,
        retryDelay: 1000,
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>
      <SnackbarProvider>
        {' '}
        <WeatherProvider>{children}</WeatherProvider>{' '}
      </SnackbarProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
