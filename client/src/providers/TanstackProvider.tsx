'use client';
import { APIError } from '@/types';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { FC, ReactNode, useState } from 'react';

declare module '@tanstack/react-query' {
  interface Register {
    defaultError: AxiosError<APIError>;
  }
}

export interface TanstackProviderProps {
  children: ReactNode;
}

// const queryClient = new QueryClient();

const TanstackProvider: FC<TanstackProviderProps> = ({ children }) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
};

export default TanstackProvider;
