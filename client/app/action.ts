'use server';

import { ServiceResponse } from '@/types';
import { Playlist, Song, TrendingPlaylist } from '@/types/playlist';
import axios from 'axios';
import { revalidatePath } from 'next/cache';

export async function getPlaylist(
  uid: string
): Promise<ServiceResponse<Playlist>> {
  console.log(`${process.env.NEXT_PUBLIC_API_URL}playlist/${uid}`);
  // const session = await getServerSession(authOptions);
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}playlist/${uid}`
    );
    console.log('DONE');
    return data;
  } catch (err) {
    console.log(err);
    const sr = new ServiceResponse<Playlist>();
    sr.success = false;
    return sr;
  }
}

export async function getTrending(): Promise<
  ServiceResponse<TrendingPlaylist[]>
> {
  console.log(`${process.env.NEXT_PUBLIC_API_URL}playlist/trending`);
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}playlist/trending`
    );
    console.log('done');

    return data;
  } catch (err) {
    console.log(err);
    const sr = new ServiceResponse<TrendingPlaylist[]>();
    sr.success = false;
    return sr;
  }
}

export async function getUserSongs(
  token: string
): Promise<ServiceResponse<Song[]> | null> {
  try {
    console.log(`${process.env.NEXT_PUBLIC_API_URL}song/`);
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}song/`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    console.log('done');
    return data;
  } catch (err) {
    console.log(err);
    const sr = new ServiceResponse<Song[]>();
    sr.success = false;
    return sr;
  }
}

export async function revalidatePathClient(path: string) {
  'use server';
  revalidatePath(path);
}
