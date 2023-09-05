'use client';

import useGetSongById from '@/hooks/useGetSongById';
import PlayerContent from './content';
// import useGetSongById from '@/hooks/useGetSongById';
// import useLoadSongUrl from '@/hooks/useLoadSongUrl';
import usePlayer from '@/hooks/stores/usePlayer';

function Player() {
  const player = usePlayer();
  // const { song, isLoading } = useGetSongById(player.activeId);
  const { song } = useGetSongById(player.activeId);
  //TODO: Fix
  const songUrl = song?.songPath;
  if (!song || !songUrl || !player.activeId) {
    return null;
  }

  return (
    <div className="fixed bottom-0 h-[80px] w-full bg-[#1b1818] px-4 py-2">
      {/* <PlayerContent key={songUrl} song={song} songUrl={songUrl} /> */}
      <PlayerContent key={songUrl} song={song} songUrl={songUrl} />
    </div>
  );
}

export default Player;
