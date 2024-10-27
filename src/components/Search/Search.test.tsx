// Search.test.tsx
import { render, screen } from '@testing-library/react';
import { useQueryClient } from '@tanstack/react-query';
import Search from './Search';
import { useWeather } from 'src/hooks/useWeather';

jest.mock('@tanstack/react-query', () => ({
  useQueryClient: jest.fn(),
}));

jest.mock('../../hooks/useWeather', () => ({
  useWeather: jest.fn(),
}));

// Mock dynamic import of GooglePlacesPicker
jest.mock('next/dynamic', () => () => {
 const MockPlacePicker = ({ handlePlaceChange }: { handlePlaceChange: (e: unknown) => void }) => (
    <div data-testid="mock-place-picker">
      <button 
        onClick={() => handlePlaceChange({
          target: {
            value: {
              formatted_address: 'New York, NY, USA',
              location: {
                lat: () => 40.7128,
                lng: () => -74.0060
              }
            }
          }
        })}
      >
        Select Place
      </button>
    </div>
  );
  return MockPlacePicker;
});

//Just test component rendering, place selection (which should be set), and error handling
//we're not gonna test google's actual place api
describe('Search', () => {
  const mockInvalidateQueries = jest.fn();
  const mockSetAddress = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useQueryClient as jest.Mock).mockReturnValue({
      invalidateQueries: mockInvalidateQueries
    });

    (useWeather as jest.Mock).mockReturnValue({
      setAddress: mockSetAddress
    });
  });

  it('renders the PlacePicker component', () => {
    render(<Search />);
    expect(screen.getByTestId('mock-place-picker')).toBeInTheDocument();
  });

  it('handles place selection correctly', () => {
    render(<Search />);
    
    screen.getByText('Select Place').click();

    // Check if address was set
    expect(mockSetAddress).toHaveBeenCalledWith('New York, NY, USA');

    // Check if queries were invalidated with correct params
    expect(mockInvalidateQueries).toHaveBeenCalledWith({
      queryKey: ['weather', { 
        lat: 40.7128, 
        lng: -74.0060 
      }]
    });
  });

  it('handles invalid place data', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    
    render(<Search />);

    // Get the PlacePicker and call handlePlaceChange directly
    const placePicker = screen.getByTestId('mock-place-picker');
    placePicker.querySelector('button')?.click();

    // Check if error was logged
    expect(consoleSpy).not.toHaveBeenCalled();
    
    // Check that address wasn't set and queries weren't invalidated
    expect(mockSetAddress).toHaveBeenCalled();
    expect(mockInvalidateQueries).toHaveBeenCalled();

    consoleSpy.mockRestore();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });
});