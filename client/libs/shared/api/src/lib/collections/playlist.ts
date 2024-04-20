import { Playlist } from '@melodiy/types';
import { AXIOS } from '../../axios';

export async function fetchPlaylist(id: string): Promise<Playlist | undefined> {
  try {
    const { data, status } = await AXIOS.get<Playlist>(`/playlist/${id}`);
    console.log(status);
    return data;
  } catch (err) {
    console.log(err);
    return;
  }
}
