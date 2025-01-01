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
): Promise<Track> {
  try {
    const response = await AXIOS.post<Track>(
      `track?public=${isPublic}`,
      formData
    );
    if (response.data == null) throw new Error('Unable to create track');

    return response.data;
  } catch (err) {
    throw getApiError(err).message;
  }
}

export async function DownloadTrack(url: string): Promise<Blob | null> {
  try {
    const { data } = await AXIOS.get(url, {
      responseType: 'arraybuffer',
    });

    const blob = new Blob([data], {
      type: 'audio/wav',
    });

    return blob;
  } catch (err) {
    return null;
  }
}
