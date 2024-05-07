import { Playlist } from '@melodiy/types';
import { AxiosError } from 'axios';
import { AXIOS } from '../../axios';
import { APIError } from '../../utils/types';

export async function fetchPlaylist(id: string): Promise<Playlist | undefined> {
  try {
    const { data } = await AXIOS.get<Playlist>(`/playlist/${id}`);
    return data;
  } catch (err) {
    console.log(err);
    return;
  }
}

export async function addTrackToPlaylist(
  playlistId: string,
  trackId: string
): Promise<Playlist | undefined> {
  try {
    const { data } = await AXIOS.post<Playlist>(
      `/playlist/${playlistId}?trackId=${trackId}`
    );
    return data;
  } catch (err) {
    console.log(err);
    return;
  }
}

export async function removeTrackFromPlaylist(
  playlistId: string,
  trackId: string
): Promise<Playlist | undefined> {
  try {
    const { data } = await AXIOS.delete<Playlist>(
      `/playlist/${playlistId}?trackId=${trackId}`
    );
    return data;
  } catch (err) {
    console.log(err);
    return;
  }
}

export async function CreatePlaylist(
  title: string,
  isPublic: boolean,
  formData: FormData
): Promise<Playlist> {
  try {
    const { data: res } = await AXIOS.post<Playlist>(
      `playlist?title=${title}&public=${isPublic}`,
      formData.has('image') ? formData : null
    );

    return res;
  } catch (err) {
    const axiosErr = err as AxiosError<APIError, Playlist>;
    throw new Error(
      axiosErr.response?.data.error ?? 'Unable to create playlist'
    );
  }
}
