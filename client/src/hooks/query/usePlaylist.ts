import useSession from '@/hooks/useSession';
import { AXIOS } from '@/lib/network';
import { Playlist } from '@/types';
import { useQuery } from '@tanstack/react-query';

export default function usePlaylists() {
  const { user } = useSession();
  return useQuery({
    queryKey: ['playlists', user?.username],
    queryFn: async () => {
      if (!user) return undefined;
      const { data } = await AXIOS.get<Playlist[]>('/playlist');
      return data;
    },
  });
}
