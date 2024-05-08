import { SearchQuery } from '@melodiy/api';
import { SearchType } from '@melodiy/types';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import useDebounce from '../useDebounce';

const MIN_SEARCH_LENGTH = 3;

export default function useArtistSearch(term = '') {
  const [loading, setLoading] = useState(false);
  const debouncedTerm = useDebounce(term, 250);
  const queryClient = useQueryClient();

  const query = useQuery({
    // queryKey: ['search', { type, value: debouncedTerm }],
    queryKey: ['search-artist', { value: debouncedTerm.toLowerCase() }],
    queryFn: async () => {
      const data = await SearchQuery(debouncedTerm, SearchType.Artist);

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
  }, [query.isLoading, term, debouncedTerm, queryClient]);

  return { query, term, loading: loading || query.isLoading };
}
