import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
  useCallback,
} from 'react';
import { Theme, WeatherData } from 'src/types/types';
import { themeStorage } from 'src/util/localStorageUtil';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  autoTheme: boolean;
}

const isNighttime = (weatherData?: WeatherData | null): boolean => {
  if (!weatherData) {
    // Fallback to time-based check if no weather data
    const hour = new Date().getHours();
    return hour < 6 || hour >= 18;
  }

  const currentTime = Date.now() / 1000; // Convert to seconds
  const localTime = currentTime + (weatherData.timezone || 0);

  return (
    localTime >= weatherData.sys.sunset || localTime < weatherData.sys.sunrise
  );
};

const getInitialTheme = (weatherData?: WeatherData | null): Theme => {
  // Check if we're on the client side
  if (typeof window === 'undefined') return 'light';

  // Check for stored preference first
  const storedTheme = localStorage.getItem('theme') as Theme | null;
  if (storedTheme === 'light' || storedTheme === 'dark') {
    return storedTheme;
  }

  // Check system preference
  if (
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  ) {
    return 'dark';
  }

  // If auto theme is enabled and we have weather data, use that
  if (localStorage.getItem('autoTheme') === 'true' && weatherData) {
    return isNighttime(weatherData) ? 'dark' : 'light';
  }

  // Default to light theme
  return 'light';
};

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

export function ThemeProvider({
  children,
  weatherData,
}: {
  children: ReactNode;
  weatherData?: WeatherData | null;
}) {
  const [theme, setTheme] = useState<Theme>(() => getInitialTheme(weatherData));
  const [autoTheme, setAutoTheme] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('autoTheme') === 'true';
  });

  // Schedule next theme update based on sunrise/sunset
  useEffect(() => {
    if (!autoTheme || !weatherData) return;

    const updateTheme = () => {
      const shouldBeDark = isNighttime(weatherData);
      setTheme(shouldBeDark ? 'dark' : 'light');
    };

    // Estimat time until next transition
    const currentTime = Date.now() / 1000;
    const localTime = currentTime + (weatherData.timezone || 0);

    let nextTransitionTime: number;
    let nextTransitionIsSunrise = false;

    if (localTime < weatherData.sys.sunrise) {
      // Before sunrise, schedule for sunrise
      nextTransitionTime = (weatherData.sys.sunrise - localTime) * 1000;
      nextTransitionIsSunrise = true;
    } else if (localTime < weatherData.sys.sunset) {
      // Before sunset, schedule for sunset
      nextTransitionTime = (weatherData.sys.sunset - localTime) * 1000;
    } else {
      // After sunset, schedule for next sunrise (add 24 hours to previous sunrise)
      const nextSunrise = weatherData.sys.sunrise + 24 * 60 * 60;
      nextTransitionTime = (nextSunrise - localTime) * 1000;
      nextTransitionIsSunrise = true;
    }

    // Initial update
    updateTheme();

    const timeout = setTimeout(() => {
      setTheme(nextTransitionIsSunrise ? 'light' : 'dark');
    }, nextTransitionTime);

    return () => clearTimeout(timeout);
  }, [weatherData, autoTheme]);

  // Update DOM and storage when theme changes
  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
    themeStorage.set(theme);
  }, [theme]);

  // Update auto theme preference in storage
  useEffect(() => {
    localStorage.setItem('autoTheme', String(autoTheme));
  }, [autoTheme]);

  const toggleTheme = useCallback(() => {
    setAutoTheme(false);
    setTheme((prevTheme) => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      return newTheme;
    });
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        autoTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
