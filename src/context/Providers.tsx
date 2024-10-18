'use client'; // This is a client-side component

import { ReactNode } from 'react';
import { WeatherProvider } from './WeatherProvider';
import { SnackbarProvider } from 'notistack';

// This component wraps all client-side providers
export default function Providers({ children }: { children: ReactNode }) {
  return<SnackbarProvider> <WeatherProvider>{children}</WeatherProvider> </SnackbarProvider>;
}