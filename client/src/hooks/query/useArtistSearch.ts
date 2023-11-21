import useDebounce from '@/hooks/useDebounce';
import { AXIOS } from '@/lib/network';
import { SearchResult, SearchType } from '@/types';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

const MIN_SEARCH_LENGTH = 3;

export default function useArtistSearch(term = '') {
  const [loading, setLoading] = useState(false);
  const debouncedTerm = useDebounce(term, 250);
  const queryClient = useQueryClient();

  const query = useQuery({
    // queryKey: ['search', { type, value: debouncedTerm }],
    queryKey: ['search-artist', { value: debouncedTerm.toLowerCase() }],
    queryFn: async () => {
      const { data } = await AXIOS.get<SearchResult>(
        `search?term=${debouncedTerm}&type=${SearchType.Artist}`
      );
      return data.artists;
    },
    // staleTime: 1000 * 15, //Cached for 15 seconds
    enabled: debouncedTerm.length >= MIN_SEARCH_LENGTH,
  });

  useEffect(() => {
    if (term.length < MIN_SEARCH_LENGTH) {
      setLoading(false); //Empty query has priorty as no loading will ever happen
      queryClient.setQueryData(['search-artist', { value: term }], []);
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
