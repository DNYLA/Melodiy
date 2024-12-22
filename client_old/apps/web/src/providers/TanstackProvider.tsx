import { APIError } from '@melodiy/api';
import { IContainer } from '@melodiy/types';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useState } from 'react';

declare module '@tanstack/react-query' {
  interface Register {
    defaultError: AxiosError<APIError>;
  }
}

export default function TanstackProvider({ children }: IContainer) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
}
