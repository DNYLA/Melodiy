'use client';
import { setAccessToken, fetcher } from '@/utils/network/axios';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { SWRConfig } from 'swr';

interface SWRProviderProps {
  children: React.ReactNode;
}

function localStorageProvider() {
  //Check if borwser is loaded; Still causes an error on invalid key.
  if (typeof window === 'undefined') return;
  // When initializing, we restore the data from `localStorage` into a map.
  const map = new Map(JSON.parse(localStorage.getItem('app-cache') || '[]'));

  // Before unloading the app, we write back all the data into `localStorage`.
  window.addEventListener('beforeunload', () => {
    const appCache = JSON.stringify(Array.from(map.entries()));
    localStorage.setItem('app-cache', appCache);
  });

  // We still use the map for write & read for performance.
  return map;
}

export const SWRProvider = ({ children }: SWRProviderProps) => {
  const { data: session } = useSession();
  //TODO: Move to a better place?

  useEffect(() => {
    if (!session?.user) return;
    setAccessToken(session?.user.accessToken);
  }, [session?.user]);

  return (
    // <SWRConfig value={{ provider: localStorageProvider as any, fetcher }}>
    <SWRConfig value={{ fetcher }}>{children}</SWRConfig>
  );
};
