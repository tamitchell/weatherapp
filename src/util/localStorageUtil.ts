import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';


export const createQueryPersister = () => {
  if (typeof window === 'undefined') return null;

  return createSyncStoragePersister({
    storage: window.localStorage,
    key: 'weather-cache',
  });
};


export const themeStorage = {
  get: (): 'light' | 'dark' => {
    if (typeof window === 'undefined') return 'light';
    
    const theme = localStorage.getItem('theme');
    if (theme === 'light' || theme === 'dark') return theme;
    
    return window.matchMedia('(prefers-color-scheme: dark)').matches 
      ? 'dark' 
      : 'light';
  },
  
  set: (theme: 'light' | 'dark') => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('theme', theme);
  }
};