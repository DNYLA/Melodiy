'use server';

import { ServiceResponse } from '@/types';
import { Playlist, Song, TrendingPlaylist } from '@/types/playlist';
import axios from 'axios';
import { revalidatePath } from 'next/cache';

export async function getPlaylist(
  uid: string
): Promise<ServiceResponse<Playlist>> {
  // const session = await getServerSession(authOptions);
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}playlist/${uid}`
  );

  return data;
}

export async function getTrending(): Promise<
  ServiceResponse<TrendingPlaylist[]>
> {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}playlist/trending`
  );

  return data;
}

export async function getUserSongs(
  token: string
): Promise<ServiceResponse<Song[]> | null> {
  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}song/`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return data;
}

export async function revalidatePathClient(path: string) {
  'use server';
  revalidatePath(path);
}
