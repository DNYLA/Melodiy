'use client';

import useGetSongById from '@/hooks/useGetSongById';
import PlayerContent from './content';
// import useGetSongById from '@/hooks/useGetSongById';
// import useLoadSongUrl from '@/hooks/useLoadSongUrl';
import usePlayer from '@/hooks/stores/usePlayer';
import React from 'react';
import useLoadFile from '@/hooks/useLoadImage';

function Player() {
  const player = usePlayer();
  // const { song, isLoading } = useGetSongById(player.activeId);
  const { song } = useGetSongById(player.activeId);
  //TODO: Fix
  const songUrl = useLoadFile(song?.songPath ?? '');

  if (!song || !songUrl || !player.activeId) {
    return null;
  }

  return (
    <div className="fixed bottom-0 bg-[#1b1818] w-full py-2 h-[80px] px-4">
      {/* <PlayerContent key={songUrl} song={song} songUrl={songUrl} /> */}
      <PlayerContent key={songUrl} song={song} songUrl={songUrl} />
    </div>
  );
}

export default Player;
