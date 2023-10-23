import { ServiceResponse } from '@/types';
import { SearchResults } from '@/types/search';
import axios from 'axios';

export const revalidate = 0;

const searchQuery = async (query: string): Promise<SearchResults> => {
  const empty: SearchResults = { songs: [], artists: [] };
  if (!query) {
    //TODO: Return Popular || Their Favourites || Recently Searched?
    return empty;
  }

  try {
    const { data } = await axios.get<ServiceResponse<SearchResults>>(
      `${process.env.NEXT_PUBLIC_API_URL}search?term=${query}`
    );
    if (data.success) return data.data;
    else return empty;
  } catch (err) {
    return empty;
  }
};

export default searchQuery;
