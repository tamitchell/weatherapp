import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import { ReactNode } from 'react';
import { WeatherProvider } from 'src/context/WeatherProvider';

export function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 0,
        gcTime: Infinity,
      },
    },
    // logger: {
    //   log: console.log,
    //   warn: console.warn,
    //   error: () => {} // silence errors in tests
    // }
  });
}

export function createWrapper() {
  const testQueryClient = createTestQueryClient();
  return function Wrapper({ children }: { children: ReactNode }) {
    return (
      <QueryClientProvider client={testQueryClient}>
        <WeatherProvider>{children}</WeatherProvider>
      </QueryClientProvider>
    );
  };
}

export function renderWithProviders(ui: React.ReactElement) {
  const queryClient = createTestQueryClient();

  return {
    ...render(
      <QueryClientProvider client={queryClient}>
        <WeatherProvider>{ui}</WeatherProvider>
      </QueryClientProvider>
    ),
    queryClient,
  };
}
