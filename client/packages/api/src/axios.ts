import { AuthResult } from '@melodiy/types';
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

export async function refreshToken(): Promise<AuthResult | { setup: boolean }> {
  const instance = axios.create(CONFIG); //Dont want to use Interceptors when refreshing token
  instance.defaults.baseURL = AXIOS.defaults.baseURL;

  const { data, request } =
    await instance.get<AuthResult>(`/auth/refresh_token`);

  if (request.responseURL.endsWith('/setup')) {
    return {
      setup: true,
    };
  }

  setAccessToken(data.accessToken);

  return data;
}

//Adds JWT token to each request
//TODO: Find out type
/* eslint-disable @typescript-eslint/no-explicit-any */
AXIOS.interceptors.request.use((req: any) => {
  if (!req.headers) return;
  if (ACCESS_TOKEN) req.headers['Authorization'] = 'Bearer ' + ACCESS_TOKEN;
  return req;
});

AXIOS.interceptors.response.use(
  (res) => {
    // Important: response interceptors **must** return the response.
    return res;
  },
  async (err) => {
    const originalRequest = err.config;
    const refreshExpired = originalRequest.url.includes('auth/refresh_token');

    if (
      err.response.status === 401 &&
      !originalRequest._retry &&
      !refreshExpired
    ) {
      originalRequest._retry = true;
      try {
        const data = await refreshToken();

        if (!('setup' in data)) {
          axios.defaults.headers.common['Authorization'] =
            'Bearer ' + data.accessToken;
        }
      } catch (err) {
        console.log('An Error Occured whilst trying to authenticate');
        console.log(err);
      }

      return axios(originalRequest);
    }

    return Promise.reject(err);
  },
);
