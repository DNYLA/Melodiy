import { useSession } from '../../../hooks/useSession';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { fetchPreviousTrack } from '@melodiy/api';
import { usePlayer } from './usePlayer';

export function useOnPrevious() {
  const { user } = useSession();
  const player = usePlayer();
  const [id, setId] = useState<string | undefined>(undefined);

  const query = useQuery({
    queryKey: ['previous', { id, userId: user?.id }],
    queryFn: async () => {
      if (player.active?.id == null) return;

      const data = await fetchPreviousTrack(
        player.active?.id,
        player.active?.collectionId,
        player.active?.type
      );

      return data;
    },
    gcTime: 0,
    enabled: !!id,
  });

  const onPrevious = (trackId: string) => {
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

  return { query, onPrevious };
}
