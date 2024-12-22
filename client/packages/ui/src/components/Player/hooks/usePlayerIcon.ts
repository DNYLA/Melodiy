import { useEffect, useState } from 'react';
import { usePlayer } from './usePlayer';

export function usePlayerIcon(id?: string) {
  const [IsItemActive, setIsItemActive] = useState(false);
  const player = usePlayer();

  useEffect(() => {
    //Return false if player closed or not playing
    if (!player.active || !player.isPlaying) {
      setIsItemActive(false);
      return;
    }

    //Check if the optional Id does not match the collection or track playing.
    if (
      id &&
      (player.active.collectionId == id ||
        player.active.artists[0]?.id == id ||
        player.active.id == id)
    ) {
      setIsItemActive(true);
      return;
    } else if (id) {
      setIsItemActive(false);
      return;
    }

    setIsItemActive(player.isPlaying);
  }, [player.active, player.isPlaying]);

  return IsItemActive;
}
