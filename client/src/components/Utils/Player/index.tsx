'use client';

import useGetTrack from '@/hooks/query/useGetTrack';
import usePlayer from '@/hooks/stores/usePlayer';
import PlayerContent from './content';
// import useGetSongById from '@/hooks/useGetSongById';
// import useLoadSongUrl from '@/hooks/useLoadSongUrl';

function Player() {
  const player = usePlayer();
  const { track } = useGetTrack(player.active?.id);

  if (!track || !track.path || !player.active) return null;

  return (
    <div className="fixed bottom-0 h-[80px] w-full bg-[#1b1818] px-4 py-2">
      <PlayerContent key={track.id} track={track} />
    </div>
  );
}

export default Player;
