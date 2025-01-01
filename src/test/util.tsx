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

//Added passing of client so that instances could be shared when making tests
export function createWrapper(client?: QueryClient) {
  const queryClient = client ?? createTestQueryClient();

  const TestWrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  TestWrapper.displayName = 'TestWrapper';

  return TestWrapper;
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
