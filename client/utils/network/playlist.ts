import { ServiceResponse } from '@/types';
import { Playlist } from '@/types/playlist';
import { AXIOS } from './axios';

export const createPlaylist = async (title: string): Promise<Playlist> => {
  const { data: res } = await AXIOS.post<ServiceResponse<Playlist>>(
    `playlist`,
    {
      title,
    }
  );

  if (res.success && res.data) return res.data;
  console.log(res.message);
  throw new Error(res.message);
};
