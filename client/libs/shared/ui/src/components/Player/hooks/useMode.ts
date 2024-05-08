import { mutatePlayerMode } from '@melodiy/api';
import { PlayerMode } from '@melodiy/types';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { usePlayer } from './usePlayer';

export function useMode() {
  const player = usePlayer();
  const [enabled, setEnabled] = useState(false);

  const query = useQuery({
    queryKey: ['player-mode', { mode: player.mode }],
    queryFn: async () => {
      if (player.active?.id == null) {
        return;
      }

      const data = await mutatePlayerMode(
        player.active?.id,
        player.active?.collectionId,
        player.active?.type,
        player.mode
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
