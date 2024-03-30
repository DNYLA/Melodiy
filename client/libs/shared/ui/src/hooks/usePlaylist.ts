import { Playlist } from '@melodiy/types';
import useSession from './useSession';
import { useQuery } from '@tanstack/react-query';
import { AXIOS } from '@melodiy/api';

export default function usePlaylists() {
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
