import { FullArtist } from '@melodiy/types';
import { AXIOS } from '../axios';

export async function fetchArtist(id: string): Promise<FullArtist | undefined> {
  try {
    const { data } = await AXIOS.get<FullArtist>(`/artist/${id}`);
    return data;
  } catch (err) {
    console.log(err);
    return;
  }
}
