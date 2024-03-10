import usePlayer, { PlayerMode } from '@/hooks/stores/usePlayer';
import useSession from '@/hooks/useSession';
import { AXIOS } from '@/lib/network';
import { PlayerResponse } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

export default function useMode() {
  const player = usePlayer();
  const [enabled, setEnabled] = useState(false);

  const query = useQuery({
    queryKey: ['player-mode', { mode: player.mode }],
    queryFn: async () => {
      console.log(player.active);
      const { data } = await AXIOS.post<PlayerResponse>(
        `/player/control?mode=${player.mode}`,
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
    const mode = player.mode;
    const newMode =
      mode === PlayerMode.NoRepeat
        ? PlayerMode.Repeat
        : mode === PlayerMode.Repeat
        ? PlayerMode.RepeatTrack
        : PlayerMode.NoRepeat;

    setEnabled(true);
    player.setMode(newMode);
  };

  return { query, onToggle };
}
