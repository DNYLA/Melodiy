import { AXIOS } from './axios';

export const fetcher = (url: string) =>
  AXIOS.get(url).then((res: any) => res.data);
