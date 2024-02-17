import usePlayer, { PlayerMode, PlayerType } from '@/hooks/stores/usePlayer';
import useSession from '@/hooks/useSession';
import { AXIOS } from '@/lib/network';
import { PlayerResponse } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

export default function useShuffle() {
  const { user } = useSession();
  const player = usePlayer();

  const query = useQuery({
    queryKey: [
      'next',
      { type: player.type, trackId: player.active?.id, userId: user?.id },
    ],
    queryFn: async () => {
      console.log(player.active);
      const { data } = await AXIOS.post<PlayerResponse>(
        `/player/control?type=${player.type}`
      );

      return data;
    },
    gcTime: 0,
  });

  const onToggle = () => {
    const newType =
      player.type === PlayerType.Normal
        ? PlayerType.Shuffle
        : PlayerType.Normal;

    player.setType(newType);
  };

  useEffect(() => {
    if (query.data === undefined) return;

    player.setQueue(query.data.queue);
  }, [query.data]);

  return { query, onToggle };
}
