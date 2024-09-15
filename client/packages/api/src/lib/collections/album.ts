import { Album } from '@melodiy/types';
import { AXIOS } from '../../axios';

export async function fetchAlbum(id: string): Promise<Album | undefined> {
  try {
    const { data } = await AXIOS.get<Album>(`/album/${id}`);
    return data;
  } catch (err) {
    console.log(err);
    return;
  }
}
