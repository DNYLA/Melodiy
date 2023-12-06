'use server';

import { SearchResults } from '@/types';
import axios from 'axios';
import { revalidatePath } from 'next/cache';

export async function revalidatePathClient(path: string) {
  'use server';
  revalidatePath(path);
}

export async function searchQeury(query: string): Promise<SearchResults> {
  const empty: SearchResults = { songs: [], artists: [] };
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
