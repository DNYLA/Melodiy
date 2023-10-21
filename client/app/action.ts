'use server';

import { ServiceResponse } from '@/types';
import { ArtistInfo, Playlist, Song, TrendingPlaylist } from '@/types/playlist';
import axios from 'axios';
import { revalidatePath } from 'next/cache';

export async function getPlaylist(
  uid: string
): Promise<ServiceResponse<Playlist>> {
  // const session = await getServerSession(authOptions);
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}playlist/${uid}`
    );
    return data;
  } catch (err) {
    console.log(err);
    const sr: ServiceResponse<Playlist> = { message: '', success: false };
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
    const sr: ServiceResponse<TrendingPlaylist[]> = {
      message: '',
      success: false,
    };
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
    const sr: ServiceResponse<Song[]> = { message: '', success: false };
    return sr;
  }
}

export async function getArtistInfo(
  id: string
): Promise<ServiceResponse<ArtistInfo>> {
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}artist/${id}`
    );

    return data;
  } catch (err) {
    console.log(err);
    const sr: ServiceResponse<ArtistInfo> = {
      message: 'Unexpected server error!',
      success: false,
    };
    return sr;
  }
}

export async function revalidatePathClient(path: string) {
  'use server';
  revalidatePath(path);
}
