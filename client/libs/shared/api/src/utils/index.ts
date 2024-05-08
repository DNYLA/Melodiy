import { AxiosError } from 'axios';
import { APIError } from './types';

export function getApiError(error: unknown) {
  const fallback = 'Unexpected Error Occured';

  if (error instanceof AxiosError) {
    const err = error as AxiosError<APIError>;
    return {
      message: err.response?.data.error ?? fallback,
      status: err.response?.status ?? 500,
    };
  }

  return { message: fallback, status: 500 };
}

export * from './types';
