import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef
} from 'react';
import { Theme, WeatherData } from 'src/types/types';
import { themeStorage } from 'src/util/localStorageUtil';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  autoTheme: boolean;
}

const calculateLocalTime = (timestamp: number, timezone: number = 0): number => {
  return timestamp + timezone;
};

const isNighttime = (weatherData?: WeatherData | null): boolean => {
  
  if (!weatherData?.sys) {
    console.log('No weather data available');
    return false;
  }

  const currentTime = Math.floor(Date.now() / 1000);
  const { sunrise, sunset } = weatherData.sys;
  const timezone = weatherData.timezone || 0;
  
  // Adjust times for local timezone
  const localCurrentTime = currentTime + timezone;
  const localSunrise = sunrise + timezone;
  const localSunset = sunset + timezone;

  const isDaytime = localCurrentTime >= localSunrise && localCurrentTime <= localSunset;
    return !isDaytime;
};


const getNextTransitionTime = (weatherData: WeatherData): number | null => {
  if (!weatherData?.sys) {
    console.log('getNextTransitionTime: No weather data available');
    return null;
  }

  const currentTime = Math.floor(Date.now() / 1000);
  const { sunrise, sunset } = weatherData.sys;
  const timezone = weatherData.timezone || 0;
  const dayLength = 24 * 60 * 60;

  console.log(`getNextTransitionTime: currentTime=${currentTime}, sunrise=${sunrise}, sunset=${sunset}, timezone=${timezone}`);

  const localCurrentTime = calculateLocalTime(currentTime, timezone);
  const localSunrise = calculateLocalTime(sunrise, timezone);
  const localSunset = calculateLocalTime(sunset, timezone);

  // Calculate next sunrise and sunset times
  let nextSunrise = localSunrise;
  let nextSunset = localSunset;

  // If we're past today's sunrise, get tomorrow's
  if (localCurrentTime >= localSunrise) {
    nextSunrise += dayLength;
    console.log(`Current time past sunrise, using tomorrow's sunrise: ${nextSunrise}`);
  }

  // If we're past today's sunset, get tomorrow's
  if (localCurrentTime >= localSunset) {
    nextSunset += dayLength;
    console.log(`Current time past sunset, using tomorrow's sunset: ${nextSunset}`);
  }

  const nextTransition = localCurrentTime < localSunset ? localSunset : nextSunrise;
  console.log(`getNextTransitionTime: localCurrentTime=${localCurrentTime}, nextSunrise=${nextSunrise}, nextSunset=${nextSunset}, nextTransition=${nextTransition}`);
  
  return nextTransition;
};

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ 
  children, 
  weatherData 
}: { 
  children: ReactNode;
  weatherData?: WeatherData | null;
}) {
  const [theme, setTheme] = useState<Theme>(() => themeStorage.get());
  const [autoTheme, setAutoTheme] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('autoTheme') === 'true';
  });


  const timeoutRef = useRef<NodeJS.Timeout>();

  const updateThemeBasedOnTime = useCallback(() => {
    if (!weatherData || !autoTheme) return;
    
    const shouldBeDark = isNighttime(weatherData);
    setTheme(shouldBeDark ? 'dark' : 'light');

    // Schedule next transition
    const nextTransition = getNextTransitionTime(weatherData);
    if (nextTransition) {
      const currentTime = Math.floor(Date.now() / 1000);
      const delay = (nextTransition - currentTime) * 1000;

      // Clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Set new timeout
      timeoutRef.current = setTimeout(updateThemeBasedOnTime, delay);
    }
  }, [weatherData, autoTheme]);

  // Schedule initial theme update
  useEffect(() => {
    if (!autoTheme || !weatherData) {
      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }

    updateThemeBasedOnTime();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [autoTheme, weatherData, updateThemeBasedOnTime]);

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

  const toggleTheme = () => {
    if (autoTheme) {
      setAutoTheme(false);
    }
    setTheme(prevTheme => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      return newTheme;
    });
  };

  return (
    <ThemeContext.Provider value={{
      theme,
      toggleTheme,
      autoTheme
    }}>
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