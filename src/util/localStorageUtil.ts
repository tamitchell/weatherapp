import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import { Theme } from 'src/types/types';

export const createQueryPersister = () => {
  if (typeof window === 'undefined') return null;

  return createSyncStoragePersister({
    storage: window.localStorage,
    key: 'weather-cache',
  });
};

const getSystemTheme = (): Theme => {
  try {
    // Check if window is defined (for SSR)
    if (typeof window === 'undefined') return 'light';

    // Check if matchMedia is available
    if (!window.matchMedia) return 'light';

    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  } catch (error) {
    console.warn('Error detecting system theme:', error);
    return 'light';
  }
};

export const themeStorage = {
  get: (): Theme => {
    if (typeof window === 'undefined') return 'light';

    // First check localStorage
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'light' || storedTheme === 'dark') {
      return storedTheme;
    }

    // If no, Fallback
    return getSystemTheme();
  },

  set: (theme: Theme) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('theme', theme);
  },
};
