import usePlayer from '@/hooks/stores/usePlayer';
import useSession from '@/hooks/useSession';
import { AXIOS } from '@/lib/network';
import { PlayerResponse } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

export default function useOnNext() {
  const { user } = useSession();
  const player = usePlayer();
  const [id, setId] = useState<string | undefined>(undefined);

  const query = useQuery({
    queryKey: ['next', { id, userId: user?.id }],
    queryFn: async () => {
      console.log(player.active);
      const { data } = await AXIOS.post<PlayerResponse>(`/player/next/`, {
        trackId: id,
        collectionId: player.active!.collectionId, //OnNext will never be called when no current track is playing / available
        collection: player.active!.type,
      });

      return data;
    },
    gcTime: 0,
    enabled: !!id,
  });

  const onNext = (trackId: string) => {
    console.log('here');
    setId(trackId);
  };

  useEffect(() => {
    if (query.data === undefined) return;

    player.setActive(
      query.data.currentTrack,
      player.active!.collectionId,
      player.active!.type
    );
    player.setQueue(query.data.queue);
  }, [query.data]);

  return { query, onNext };
}
