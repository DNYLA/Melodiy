import usePlayer from './usePlayer';
import React from 'react';
import { useSession } from 'next-auth/react';
import { Song } from '@/types/playlist';

const useOnPlay = () => {
  const player = usePlayer();
  const { data: session } = useSession();

  const onPlay = (id: string) => {
    // if (!session?.user) {
    //   return authModal.onOpen();
    // }

    player.setId(id);
    // player.setIds(songs.map((song) => song.uid));
  };

  const onPlayPause = (id: string) => {};

  return onPlay;
};

export default useOnPlay;
