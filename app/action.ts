'use server';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import axios from 'axios';
import { getServerSession } from 'next-auth';

export async function getPlaylist(shareId: string): Promise<any> {
  const session = await getServerSession(authOptions);
  const { data } = await axios.get(
    `http://localhost:5062/api/playlist/public/${shareId}`
  );

  return data.data;
}
