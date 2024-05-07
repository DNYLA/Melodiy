import { fetchNextTrack } from '@melodiy/api';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useSession } from '../../../hooks/useSession';
import { usePlayer } from './usePlayer';

export function useOnNext() {
  const { user } = useSession();
  const player = usePlayer();
  const [id, setId] = useState<string | undefined>(undefined);

  const query = useQuery({
    queryKey: ['next', { id, userId: user?.id }],
    queryFn: async () => {
      console.log(player.active);
      if (player.active?.id == null) {
        return;
      }

      const data = await fetchNextTrack(
        player.active?.id,
        player.active?.collectionId,
        player.active?.type
      );

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
    if (query.data === undefined || query.data?.currentTrack == null) return;

    player.setActive(
      query.data.currentTrack,
      player.active!.collectionId,
      player.active!.type
    );
    player.setQueue(query.data.queue);
  }, [query.data]);

  return { query, onNext };
}
