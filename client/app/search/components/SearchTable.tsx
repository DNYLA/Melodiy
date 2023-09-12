'use client';

import { ColumnBuilder } from '@/components/Data/Tables/ColumnBuilder';
import SongTable from '@/components/Data/Tables/Song/SongTable';
import usePlayer from '@/hooks/stores/usePlayer';
import { PlaylistType } from '@/types';
import { Song } from '@/types/playlist';

export interface ISearchTable {
  songs: Song[];
}

const SearchTable: React.FC<ISearchTable> = ({ songs }) => {
  const { activeId } = usePlayer();
  const isActiveTrack = (id: string) => (activeId ?? '-1') === id;

  const columns = new ColumnBuilder()
    .AddPosition(isActiveTrack)
    .AddTitle(isActiveTrack)
    // .AddAlbum()
    // .AddDate('Date Added')
    .AddDuration()
    .Build();
  console.log(songs);
  return (
    <div className="flex flex-col">
      <span className="text-center text-lg font-bold">Top Songs</span>
      <SongTable data={songs} columns={columns} type={PlaylistType.Playlist} />
    </div>
  );
};

export default SearchTable;
