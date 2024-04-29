import { Playlist, Track } from '@melodiy/types';
import { AXIOS } from '../axios';
import { getApiError } from '../utils';

export async function deleteTrack(id: string): Promise<Playlist | undefined> {
  try {
    const { data } = await AXIOS.delete<Playlist>(`/track/${id}`);
    return data;
  } catch (err) {
    console.log(err);
    return;
  }
}

export async function fetchUserTracks(): Promise<Track[]> {
  try {
    const { data } = await AXIOS.get<Track[]>(`/track/`);
    return data;
  } catch (err) {
    console.log(err);
    return [];
  }
}

export async function UpoloadTrack(
  formData: FormData,
  isPublic: boolean
): Promise<boolean> {
  try {
    await AXIOS.post(`track?public=${isPublic}`, formData);
    return true;
  } catch (err) {
    throw getApiError(err).message;
  }

  return false;
}
