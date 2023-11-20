import useDebounce from '@/hooks/useDebounce';
import { AXIOS } from '@/lib/network';
import { SearchType } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

export type SpecificSearchResult = {
  id: number;
  name: string;
  image?: string;
};

const MIN_SEARCH_LENGTH = 3;

export default function useAlbumOrArtistSearch(term = '', type: SearchType) {
  // const [term, setTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const debouncedTerm = useDebounce(term);

  const query = useQuery({
    // queryKey: ['search', { type, value: debouncedTerm }],
    queryKey: ['search', { type, value: debouncedTerm.toLowerCase() }],
    queryFn: async () => {
      console.log('search', { type, value: debouncedTerm.toLowerCase() });
      const { data } = await AXIOS.get<SpecificSearchResult[]>(
        `search?term=${debouncedTerm}&type=${SearchType.Artist}`
      );
      return data;
    },
    // staleTime: 1000 * 15, //Cached for 15 seconds
    enabled: debouncedTerm.length >= MIN_SEARCH_LENGTH,
  });

  useEffect(() => {
    if (term.length < MIN_SEARCH_LENGTH) {
      setLoading(false); //Empty query has priorty as no loading will ever happen
      return;
    }

    //We want to simulate loading when term !== debounceTerm even though we are not fetching anything
    if (query.isLoading || term !== debouncedTerm) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [query.isLoading, term, debouncedTerm]);

  return { query, term, loading };
}
