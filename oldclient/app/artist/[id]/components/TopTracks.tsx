'use client';

import { ColumnBuilder } from '@/components/Data/Tables/ColumnBuilder';
import SongTable from '@/components/Data/Tables/Song/SongTable';
import usePlayer from '@/hooks/stores/usePlayer';
import { PlaylistType } from '@/types';
import { Song } from '@/types/playlist';

export interface ITopTracks {
  songs: Song[];
}

const TopTracks: React.FC<ITopTracks> = ({ songs }) => {
  const { activeId } = usePlayer();
  const isActiveTrack = (id: string) => (activeId ?? '-1') === id;

  const columns = new ColumnBuilder()
    .AddTitle(isActiveTrack)
    .AddAlbum()
    .AddDuration()
    .Build();

  return (
    <div className="">
      <div className="mb-1 flex items-center justify-between align-middle">
        <h1 className="text-xl font-bold">Top Tracks</h1>
        <span className="cursor-pointer text-center align-middle text-sm font-light uppercase transition-all delay-100 ease-in-out hover:opacity-80">
          View All
        </span>
      </div>
      <SongTable data={songs} columns={columns} type={PlaylistType.Playlist} />
    </div>
  );
};

export default TopTracks;
