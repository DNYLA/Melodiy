import useDebounce from '@/hooks/useDebounce';
import { AXIOS } from '@/lib/network';
import { SearchType } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

export type ArtistSearch = {
  id: number;
  name: string;
};

const MIN_SEARCH_LENGTH = 3;

export default function useArtistSearch() {
  const [term, setTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const debouncedTerm = useDebounce(term);

  const query = useQuery({
    queryKey: ['search-artist', debouncedTerm],
    queryFn: async () => {
      const { data } = await AXIOS.get<ArtistSearch[]>(
        `search?term=${debouncedTerm}&type=${SearchType.Artist}`
      );
      return data;
    },
    enabled: debouncedTerm.length >= MIN_SEARCH_LENGTH,
  });

  useEffect(() => {
    if (term.length < MIN_SEARCH_LENGTH) {
      setLoading(false); //Empty query has priorty as no loading will ever happen
      return;
    }

    //We want to simulate loading when term !== debounceTerm even though we are not fetching anything
    if (query.isLoading || term !== debouncedTerm) setLoading(true);
    else setLoading(false);
  }, [query.isLoading, term, debouncedTerm]);

  return { query, term, setTerm, loading };
}
