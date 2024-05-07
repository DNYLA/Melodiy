import { AXIOS } from '@melodiy/api';
import { Playlist } from '@melodiy/types';
import { useQuery } from '@tanstack/react-query';
import { useSession } from '../useSession';

export function usePlaylists() {
  const { user } = useSession();

  const query = useQuery({
    queryKey: ['playlists', user?.username],
    queryFn: async () => {
      const { data } = await AXIOS.get<Playlist[]>('/playlist');
      return data;
    },
    enabled: user ? true : false,
  });

  return query;
}
