import { PlayerResponse, PlayerType } from '@melodiy/types';
import { usePlayer } from './usePlayer';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { mutateShuffle } from '@melodiy/api';

export function useShuffle() {
  const player = usePlayer();
  const [enabled, setEnabled] = useState(false);

  const query = useQuery({
    queryKey: ['player-shuffle', { type: player.type }],
    queryFn: async () => {
      if (player.active?.id == null) {
        return;
      }

      const data = await mutateShuffle(
        player.active?.id,
        player.active?.collectionId,
        player.active?.type,
        player.type
      );
      return data;
    },
    enabled,
  });

  const onToggle = () => {
    const newType =
      player.type === PlayerType.Normal
        ? PlayerType.Shuffle
        : PlayerType.Normal;

    setEnabled(true);
    player.setType(newType);
  };

  useEffect(() => {
    if (query.data === undefined || query.data?.currentTrack == null) return;

    console.log(query.data.queue);

    player.setQueue(query.data.queue);
  }, [query.data]);

  return { query, onToggle };
}
