import {
  createContext,
  ReactNode,
  useEffect,
  useState,
} from 'react';
import {
  Units,
  WeatherContextProps,
} from '../types/types';

export const WeatherContext = createContext<WeatherContextProps | undefined>(
  undefined
);


export const WeatherProvider = ({ children }: { children: ReactNode }) => {
  const [units, setUnits] = useState<Units>(() => {
    if (typeof window === 'undefined') return 'imperial';
    return (localStorage.getItem('weatherUnits') as Units) || 'imperial';
  });
  
  const [address, setAddress] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('weatherUnits', units);
  }, [units]);

  return (
    <WeatherContext.Provider 
      value={{
        units,
        setUnits,
        address,
        setAddress,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};