import { Playlist, Track } from '@melodiy/types';
import { AXIOS } from '../axios';

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
