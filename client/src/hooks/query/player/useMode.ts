import usePlayer, { PlayerMode } from '@/hooks/stores/usePlayer';
import useSession from '@/hooks/useSession';
import { AXIOS } from '@/lib/network';
import { PlayerResponse } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

export default function useMode() {
  const { user } = useSession();
  const player = usePlayer();
  const [mode, setMode] = useState<string | undefined>(undefined);

  const query = useQuery({
    queryKey: [
      'next',
      { mode: player.mode, trackId: player.active?.id, userId: user?.id },
    ],
    queryFn: async () => {
      console.log(player.active);
      const { data } = await AXIOS.post<PlayerResponse>(
        `/player/control?mode=${player.mode}`
      );

      return data;
    },
    gcTime: 0,
  });

  const onToggle = () => {
    const mode = player.mode;
    const newMode =
      mode === PlayerMode.NoRepeat
        ? PlayerMode.Repeat
        : mode === PlayerMode.Repeat
        ? PlayerMode.RepeatTrack
        : PlayerMode.NoRepeat;
    player.setMode(newMode);
  };

  useEffect(() => {
    if (query.data === undefined) return;

    player.setQueue(query.data.queue);
  }, [query.data]);

  return { query, onToggle };
}
