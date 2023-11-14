import axios, { AxiosRequestConfig } from 'axios';

const CONFIG: AxiosRequestConfig = {
  withCredentials: true,
  baseURL: process.env.NEXT_PUBLIC_API_URL,
};

///Axios Uses .defaults.baseURL to set/call the API this way we can change the API URL outside the library.
export const AXIOS = axios.create(CONFIG);
var ACCESS_TOKEN: string | null = '';

export const setAccessToken = (token: string) => {
  ACCESS_TOKEN = token;
};

export const resetAccessToken = () => (ACCESS_TOKEN = null);

//Adds JWT token to each request
//TODO: Find out type
/* eslint-disable @typescript-eslint/no-explicit-any */
AXIOS.interceptors.request.use((req: any) => {
  if (!req.headers) return;
  req.headers['Authorization'] = 'Bearer ' + ACCESS_TOKEN;
  return req;
});

export async function fetcher<T>(url: string) {
  try {
    const res = await AXIOS.get<T>(url);

    return res.data;
  } catch (err) {
    //TODO: Add type APIError? & Fix
    // if (res.status !== 200) {
    //   const message = res.message ? res.data.message : 'Unexpected error occured.';
    //   const error = new NetworkError(message, res.status);
    //   error.data = res.data;
    //   throw error;
    // }

    const error = new NetworkError('Unexpected error occured', 500);
    error.data = null;
    throw error;
  }
}

export class NetworkError extends Error {
  public data: unknown;
  public status: number = 500;
  constructor(m: string, status: number) {
    super(m);
    this.status = status;
  }
}
