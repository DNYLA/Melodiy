'use client';

import useGetTrack from '@/hooks/query/useGetTrack';
import usePlayer from '@/hooks/stores/usePlayer';
import PlayerContent from './content';
// import useGetSongById from '@/hooks/useGetSongById';
// import useLoadSongUrl from '@/hooks/useLoadSongUrl';

function Player() {
  const player = usePlayer();
  const { data, isLoading } = useGetTrack(player.active?.id);

  if (!player.active) return <></>;
  if (!data || !data.path || isLoading) return <></>;

  return (
    <div className="fixed bottom-0 h-[80px] w-full bg-[#1b1818] px-4 py-2">
      {/* <PlayerContent key={songUrl} song={song} songUrl={songUrl} /> */}
      <PlayerContent key={data.id} track={data} />
    </div>
  );
}

export default Player;
