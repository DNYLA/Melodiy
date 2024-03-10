'use server';

import { getApiRoute } from '@/lib/network/helpers';
import { FullArtist, SearchResults } from '@/types';
import axios from 'axios';
import { revalidatePath } from 'next/cache';

export async function revalidatePathClient(path: string) {
  'use server';
  revalidatePath(path);
}

export async function searchQeury(query: string): Promise<SearchResults> {
  const empty: SearchResults = { tracks: [], artists: [], albums: [] };
  if (!query) {
    //TODO: Return Popular || Their Favourites || Recently Searched?
    return empty;
  }

  try {
    const { data } = await axios.get<SearchResults>(
      `${process.env.NEXT_PUBLIC_API_URL}search?term=${query}`
    );
    return data;
  } catch (err) {
    return empty;
  }
}

export async function getArtist(id: string): Promise<FullArtist | null> {
  try {
    const { data } = await axios.get(getApiRoute(`/artist/${id}`));

    return data;
  } catch (err) {
    return null;
  }
}
