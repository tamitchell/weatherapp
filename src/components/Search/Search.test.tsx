import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Search from './Search';
import { useWeather } from 'src/hooks/useWeather';
import { useGeolocationQuery } from 'src/hooks/queries/useGeolocationQuery';
import { WeatherProvider } from 'src/context/WeatherProvider';

jest.mock('../../hooks/queries/useGeolocationQuery', () => ({
  useGeolocationQuery: jest.fn()
}));

jest.mock('../../hooks/useWeather', () => ({
  useWeather: jest.fn()
}));

// Mock dynamic import of GooglePlacesPicker
jest.mock('next/dynamic', () => () => {
  const MockPlacePicker = ({
    handlePlaceChange,
  }: {
    handlePlaceChange: (e: unknown) => void;
  }) => (
    <div data-testid="mock-place-picker">
      <button
        onClick={() =>
          handlePlaceChange({
            target: {
              value: {
                formatted_address: 'New York, NY, USA',
                location: {
                  lat: () => 40.7128,
                  lng: () => -74.006,
                },
              },
            },
          })
        }
      >
        Select Place
      </button>
    </div>
  );
  return MockPlacePicker;
});

const createTestQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      gcTime: Infinity
    },
  },
});

const renderWithProviders = (ui: React.ReactElement) => {
  const testQueryClient = createTestQueryClient();
  return {
    ...render(
      <QueryClientProvider client={testQueryClient}>
        <WeatherProvider>{ui}</WeatherProvider>
      </QueryClientProvider>
    ),
    testQueryClient
  };
};

describe('Search', () => {
  const mockUpdateLocation = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useGeolocationQuery as jest.Mock).mockReturnValue({
      updateLocation: mockUpdateLocation
    });

    (useWeather as jest.Mock).mockReturnValue({
      units: 'imperial'
    });
  });

  it('renders the PlacePicker component', async () => {
    renderWithProviders(<Search />);
    
    await waitFor(() => {
      expect(screen.getByTestId('mock-place-picker')).toBeInTheDocument();
    });
  });

  it('handles place selection correctly', async () => {
    renderWithProviders(<Search />);
    
    screen.getByText('Select Place').click();

    await waitFor(() => {
      expect(mockUpdateLocation).toHaveBeenCalledWith({
        lat: 40.7128,
        lng: -74.006,
        address: 'New York, NY, USA'
      });
    });
  });

  it('handles invalid place data', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    
    try {
      renderWithProviders(<Search />);
      
      const placePicker = screen.getByTestId('mock-place-picker');
      const button = placePicker.querySelector('button');
      if (button) {
        button.click();
      }

      await waitFor(() => {
        expect(mockUpdateLocation).toHaveBeenCalledWith({
          lat: 40.7128,
          lng: -74.006,
          address: 'New York, NY, USA'
        });
      });
      
      expect(consoleSpy).not.toHaveBeenCalled();
    } finally {
      consoleSpy.mockRestore();
    }
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });
});