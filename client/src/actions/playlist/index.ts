'use server';

import { getServerSession } from '@/actions/auth';
import { getApiRoute } from '@/lib/network/helpers';
import { Track } from '@/types';
import { Playlist } from '@/types/playlist';
import axios from 'axios';

export async function getUserTracks(): Promise<Track[]> {
  try {
    const session = await getServerSession();
    const { data } = await axios.get(getApiRoute('/track'), {
      headers: { Authorization: `Bearer ${session?.token}` },
    });
    return data;
  } catch (err) {
    console.log(err);
    return [];
  }
}

export async function getPlaylist(id: string): Promise<Playlist | null> {
  try {
    const session = await getServerSession();
    const { data } = await axios.get(getApiRoute(`/playlist/${id}`), {
      headers: { Authorization: `Bearer ${session?.token}` },
    });
    return data;
  } catch (err) {
    console.log(err);
    return null;
  }
}
