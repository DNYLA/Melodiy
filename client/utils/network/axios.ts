import { ServiceResponse } from '@/types';
import axios, { AxiosRequestConfig } from 'axios';
// import { AuthResult, UserDto } from '../types';

const CONFIG: AxiosRequestConfig = {
  withCredentials: true,
  baseURL: process.env.NEXT_PUBLIC_API_URL,
};
export const AXIOS = axios.create(CONFIG); //Axios Uses .defaults.baseURL to set/call the API this way we can change the API URL outside the library.
let ACCESS_TOKEN = '';

export const setAccessToken = (token: string) => {
  ACCESS_TOKEN = token;
};

//Adds JWT token to each request
//TODO: Find out type
/* eslint-disable @typescript-eslint/no-explicit-any */
AXIOS.interceptors.request.use((req: any) => {
  if (!req.headers) return;
  req.headers['Authorization'] = 'Bearer ' + ACCESS_TOKEN;
  // console.log(req);
  return req;
});

// export const fetcher = async (url: string) => {
export async function fetcher<T>(url: string) {
  try {
    const res = await AXIOS.get<ServiceResponse<T>>(url);
    if (res.status !== 200) {
      const message = res.data ? res.data.message : 'Unexpected error occured.';
      const error = new NetworkError(message, res.status);
      error.data = res.data;
      throw error;
    }

    return res.data;
  } catch (err) {
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
