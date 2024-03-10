import usePlayer, { PlayerMode, PlayerType } from '@/hooks/stores/usePlayer';
import useSession from '@/hooks/useSession';
import { AXIOS } from '@/lib/network';
import { PlayerResponse } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

export default function useShuffle() {
  const player = usePlayer();
  const [enabled, setEnabled] = useState(false);

  const query = useQuery({
    queryKey: ['player-shuffle', { type: player.type }],
    queryFn: async () => {
      const { data } = await AXIOS.post<PlayerResponse>(
        `/player/control?shuffle=${player.type}`,
        {
          trackId: player.active?.id,
          collectionId: player.active?.collectionId,
          collection: player.active?.type,
        }
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
    if (query.data === undefined) return;

    console.log(query.data.queue);

    player.setQueue(query.data.queue);
  }, [query.data]);

  return { query, onToggle };
}
