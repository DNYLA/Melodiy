import { useQuery, useQueryClient } from '@tanstack/react-query';
import useDebounce from '../useDebounce';
import { useSession } from '../useSession';
import { useEffect, useState } from 'react';
import { SearchUserCreatedContent, getApiError } from '@melodiy/api';
import { SearchType } from '@melodiy/types';
import toast from 'react-hot-toast';

const MIN_SEARCH_LENGTH = 3;

export default function useAlbumSearch(term = '', artistId?: string) {
  const [loading, setLoading] = useState(false);
  const debouncedTerm = useDebounce(term, 250);
  const queryClient = useQueryClient();
  const { user } = useSession();

  const query = useQuery({
    queryKey: [
      'search-album',
      { id: user?.id, value: debouncedTerm.toLowerCase() },
    ],
    queryFn: async () => {
      try {
        const result = await SearchUserCreatedContent(
          debouncedTerm,
          artistId,
          SearchType.Album
        );

        return result.albums;
      } catch (err) {
        toast.error(getApiError(err).message);
      }
    },
    // staleTime: 1000 * 15, //Cached for 15 seconds
    enabled:
      debouncedTerm.length >= MIN_SEARCH_LENGTH && !!user && artistId !== 'new',
  });

  useEffect(() => {
    console.log(term);
    if (term.length < MIN_SEARCH_LENGTH) {
      setLoading(false); //Empty query has priorty as no loading will ever happen
      queryClient.setQueryData(
        ['search-album', { id: user?.id, value: term }],
        []
      );
      return;
    }

    //We want to simulate loading when term !== debounceTerm even though we are not fetching anything
    if (query.isLoading || term !== debouncedTerm) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [query.isLoading, term, debouncedTerm, queryClient, user?.id]);

  return { query, loading };
}
