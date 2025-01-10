import { render, screen, act } from '@testing-library/react';
import { ThemeProvider, useTheme } from './ThemeProvider';
import { WeatherData } from 'src/types/types';


// Mock matchMedia
const mockMatchMedia = (matches: boolean) => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches,
      media: query,
      onchange: null,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
};

// Mock weather data generator
const createMockWeatherData = (
  currentTime: number,
  sunrise: number,
  sunset: number,
  timezone = 0
): WeatherData => ({
  sys: {
    type: 1,
    id: 1,
    country: 'US',
    sunrise,
    sunset,
  },
  timezone,
  // Add required WeatherData properties
  coord: { lon: 0, lat: 0 },
  weather: [{ id: 800, main: 'Clear', description: 'clear sky', icon: '01d' }],
  base: 'stations',
  main: {
    temp: 20,
    feels_like: 20,
    temp_min: 15,
    temp_max: 25,
    pressure: 1013,
    humidity: 75,
  },
  visibility: 10000,
  wind: { speed: 5, deg: 180 },
  clouds: { all: 0 },
  dt: currentTime,
  id: 123,
  name: 'Test City',
  cod: 200,
});

// Mock current time for testing
const mockTime = (timestamp: number) => {
  jest.spyOn(Date, 'now').mockImplementation(() => timestamp * 1000);
};

// Test component that uses the theme
const TestComponent = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div>
      <span data-testid="theme-value">{theme}</span>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
};

describe('ThemeProvider', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('light', 'dark');
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('uses system preference when no theme is stored', () => {
    mockMatchMedia(true);
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('theme-value')).toHaveTextContent('dark');
    expect(document.documentElement).toHaveClass('dark');
  });

  it('uses stored theme over system preference', () => {
    mockMatchMedia(true);
    localStorage.setItem('theme', 'light');

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('theme-value')).toHaveTextContent('light');
    expect(document.documentElement).toHaveClass('light');
  });

  it('toggles theme correctly', () => {
    mockMatchMedia(false);
    
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('theme-value')).toHaveTextContent('light');
    expect(document.documentElement).toHaveClass('light');

    act(() => {
      screen.getByRole('button').click();
    });

    expect(screen.getByTestId('theme-value')).toHaveTextContent('dark');
    expect(document.documentElement).toHaveClass('dark');
    expect(localStorage.getItem('theme')).toBe('dark');
  });

  it('persists theme changes to localStorage', () => {
    mockMatchMedia(false);
    
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    act(() => {
      screen.getByRole('button').click();
    });

    expect(localStorage.getItem('theme')).toBe('dark');
  });

  describe('Auto theme switching', () => {
    beforeEach(() => {
      localStorage.setItem('autoTheme', 'true');
      jest.useFakeTimers();
    });

    it('switches to dark theme after sunset', () => {
      const currentTime = 1700000000; // After sunset
      const sunrise = 1699950000;    // Early sunrise
      const sunset = 1699990000;     // Early sunset
      
      mockTime(currentTime);
      
      const mockWeather = createMockWeatherData(
        currentTime,
        sunrise,
        sunset
      );

      render(
        <ThemeProvider weatherData={mockWeather}>
          <TestComponent />
        </ThemeProvider>
      );

      expect(screen.getByTestId('theme-value')).toHaveTextContent('dark');
    });

    it('switches to light theme after sunrise', () => {
      const currentTime = 1699970000; // During day
      const sunrise = 1699950000;    // Early sunrise
      const sunset = 1699990000;     // Later sunset
      
      mockTime(currentTime);
      
      const mockWeather = createMockWeatherData(
        currentTime,
        sunrise,
        sunset
      );

      render(
        <ThemeProvider weatherData={mockWeather}>
          <TestComponent />
        </ThemeProvider>
      );

      expect(screen.getByTestId('theme-value')).toHaveTextContent('light');
    });

    it('schedules theme switch for next sunrise', () => {
      const currentTime = 1700000000; // Night time
      const sunrise = 1699950000;    // Prev sunrise
      const sunset = 1699990000;     // Prev sunset
      const nextSunrise = sunrise + 24 * 60 * 60; // Next day sunrise
      
      mockTime(currentTime);
      
      const mockWeather = createMockWeatherData(
        currentTime,
        sunrise,
        sunset
      );

      render(
        <ThemeProvider weatherData={mockWeather}>
          <TestComponent />
        </ThemeProvider>
      );

      // Initially dark
      expect(screen.getByTestId('theme-value')).toHaveTextContent('dark');

      // Advance time to next sunrise
      act(() => {
        mockTime(nextSunrise + 1);
        jest.advanceTimersByTime((nextSunrise - currentTime) * 1000);
      });

      // Should switch to light theme
      expect(screen.getByTestId('theme-value')).toHaveTextContent('light');
    });

    it('handles timezone offsets correctly', () => {
      const currentTime = 1699970000;
      const sunrise = 1699950000;
      const sunset = 1699990000;
      const timezone = 3600; // UTC+1
      
      mockTime(currentTime);
      
      const mockWeather = createMockWeatherData(
        currentTime,
        sunrise,
        sunset,
        timezone
      );

      render(
        <ThemeProvider weatherData={mockWeather}>
          <TestComponent />
        </ThemeProvider>
      );

      // Confirm theme set correctly based on local time
      expect(screen.getByTestId('theme-value')).toHaveTextContent('light');
    });

    it('disables auto switching when manually toggling theme', () => {
      const currentTime = 1699970000; // During day
      const sunrise = 1699950000;
      const sunset = 1699990000;
      
      mockTime(currentTime);
      
      const mockWeather = createMockWeatherData(
        currentTime,
        sunrise,
        sunset
      );

      render(
        <ThemeProvider weatherData={mockWeather}>
          <TestComponent />
        </ThemeProvider>
      );

      // Start: light (daytime)
      expect(screen.getByTestId('theme-value')).toHaveTextContent('light');

      // Manually toggle
      act(() => {
        screen.getByRole('button').click();
      });

      // Should switch to dark and stay dark even during daytime
      expect(screen.getByTestId('theme-value')).toHaveTextContent('dark');
      expect(localStorage.getItem('autoTheme')).toBe('false');
    });
  });
});
