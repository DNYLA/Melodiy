import { Playlist } from '@melodiy/types';
import { AXIOS } from '../../axios';

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
