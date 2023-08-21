import usePlayer from './stores/usePlayer';
import React from 'react';
import { useSession } from 'next-auth/react';
import { Song } from '@/types/playlist';

const useOnPlay = () => {
  const player = usePlayer();
  const { data: session } = useSession();

  const onPlay = (id: string, songs: Song[]) => {
    // if (!session?.user) {
    //   return authModal.onOpen();
    // }

    player.setId(id);

    if (songs.length == 0) player.setIds([id]);
    else player.setIds(songs.map((song) => song.uid));
  };

  const onPlayPause = (id: string) => {};

  return onPlay;
};

export default useOnPlay;
