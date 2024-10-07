'use client'; // This is a client-side component

import { ReactNode } from 'react';
import { WeatherProvider } from './WeatherProvider';

// This component wraps all client-side providers
export default function Providers({ children }: { children: ReactNode }) {
  return <WeatherProvider>{children}</WeatherProvider>;
}