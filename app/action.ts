'use server';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { Playlist } from '@/types/playlist';
import axios from 'axios';
import { getServerSession } from 'next-auth';

export async function getPlaylist(
  shareId: string
): Promise<ServiceResponse<Playlist>> {
  const session = await getServerSession(authOptions);
  const { data } = await axios.get(
    `http://localhost:5062/api/playlist/public/${shareId}`
  );

  return data;
}
