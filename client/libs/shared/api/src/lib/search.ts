import { SearchResult } from '@melodiy/types';
import { AXIOS } from '../axios';

export async function searchQeury(query?: string): Promise<SearchResult> {
  const empty: SearchResult = { tracks: [], artists: [], albums: [] };
  console.log(`query: ${query}`);
  if (!query) {
    //TODO: Return Popular || Their Favourites || Recently Searched?
    return empty;
  }

  try {
    const { data } = await AXIOS.get<SearchResult>(`search?term=${query}`);
    return data;
  } catch (err) {
    return empty;
  }
}
