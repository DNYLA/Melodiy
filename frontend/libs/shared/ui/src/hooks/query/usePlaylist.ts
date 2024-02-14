import useSession from '../useSession';
import { AXIOS } from '@melodiy/network';
import { Playlist } from '@melodiy/types';
import { useQuery } from '@tanstack/react-query';

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
