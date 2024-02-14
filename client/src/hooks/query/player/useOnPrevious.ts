import usePlayer from '@/hooks/stores/usePlayer';
import useSession from '@/hooks/useSession';
import { AXIOS } from '@/lib/network';
import { PlayerResponse } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

export default function useOnPrevious() {
  const { user } = useSession();
  const player = usePlayer();
  const [id, setId] = useState<string | undefined>(undefined);

  const query = useQuery({
    queryKey: ['previous', { id, userId: user?.id }],
    queryFn: async () => {
      const { data } = await AXIOS.post<PlayerResponse>(`/player/previous/`, {
        trackId: id,
        collectionId: player.active!.collectionId,
        type: player.active!.type,
      });

      return data;
    },
    gcTime: 0,
    enabled: !!id,
  });

  const onPrevious = (trackId: string) => {
    setId(trackId);
  };

  useEffect(() => {
    if (query.data === undefined) return;
    console.log(query.data.currentTrack.title);

    player.setActive(
      query.data.currentTrack,
      player.active!.collectionId,
      player.active!.type
    );
    player.setQueue(query.data.queue);
  }, [query.data]);

  return { query, onPrevious };
}
