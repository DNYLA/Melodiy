import axios, { AxiosRequestConfig } from 'axios';
// import { AuthResult, UserDto } from '../types';

const CONFIG: AxiosRequestConfig = {
  withCredentials: true,
  baseURL: process.env.API_URL,
};
export const AXIOS = axios.create(CONFIG); //Axios Uses .defaults.baseURL to set/call the API this way we can change the API URL outside the library.
let ACCESS_TOKEN = '';

//Adds JWT token to each request
//TODO: Find out type
AXIOS.interceptors.request.use((req: any) => {
  if (!req.headers) return;
  req.headers['Authorization'] = 'Bearer ' + ACCESS_TOKEN;
  // console.log(req);
  return req;
});
