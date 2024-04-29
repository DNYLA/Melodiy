import { SearchResult, SearchType } from '@melodiy/types';
import { AXIOS } from '../axios';
import { getApiError } from '../utils';

export async function SearchQuery(
  query?: string,
  type?: SearchType
): Promise<SearchResult> {
  type = type ?? SearchType.All;

  try {
    const { data } = await AXIOS.get<SearchResult>(
      `search?term=${query}&type=${type}`
    );
    return data;
  } catch (err) {
    return { tracks: [], artists: [], albums: [] };
  }
}

export async function SearchUserCreatedContent(
  term?: string,
  artistId?: string,
  type?: SearchType
): Promise<SearchResult> {
  type = type ?? SearchType.All;

  let endpoint = `search/me?term=${term}&type=${type}`;
  if (artistId) endpoint += `&artistId=${artistId}`;

  try {
    const { data } = await AXIOS.get<SearchResult>(endpoint);
    return data;
  } catch (err) {
    throw getApiError(err);
  }
}
