'use server';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { Playlist, Song } from '@/types/playlist';
import axios from 'axios';
import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';

export async function getPlaylist(
  uid: string
): Promise<ServiceResponse<Playlist>> {
  const session = await getServerSession(authOptions);
  const { data } = await axios.get(`http://localhost:5062/api/playlist/${uid}`);

  return data;
}

export async function getUserSongs(
  token: string
): Promise<ServiceResponse<Song[]> | null> {
  const { data } = await axios.get(`http://localhost:5062/api/song/`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return data;
}

export async function revalidatePathClient(path: string) {
  'use server';
  revalidatePath(path);
}
