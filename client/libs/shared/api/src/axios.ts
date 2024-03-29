import axios, { AxiosRequestConfig } from 'axios';

const CONFIG: AxiosRequestConfig = {
  withCredentials: true,
};

///Axios Uses .defaults.baseURL to set/call the API this way we can change the API URL outside the library.
export const AXIOS = axios.create(CONFIG);
let ACCESS_TOKEN: string | null = '';

export const initialiseAxios = (baseURL: string, accessToken?: string) => {
  AXIOS.defaults.baseURL = baseURL;
  if (accessToken) ACCESS_TOKEN = accessToken;
};

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
