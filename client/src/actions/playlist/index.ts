'use server';

import { getApiRoute } from '@/lib/network/helpers';
import { Track } from '@/types';
import axios from 'axios';

export async function getUserTracks(token: string): Promise<Track[]> {
  try {
    const { data } = await axios.get(getApiRoute('/track'), {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  } catch (err) {
    console.log(err);
    return [];
  }
}
