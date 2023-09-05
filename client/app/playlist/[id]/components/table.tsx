'use client';
import { ColumnBuilder } from '@/components/Data/Tables/ColumnBuilder';
import SongTable from '@/components/Data/Tables/Song/SongTable';
import usePlayer from '@/hooks/stores/usePlayer';
import { PlaylistType } from '@/types';
import { Song } from '@/types/playlist';

interface PlaylistTableProps {
  data: Song[];
  type: PlaylistType;
}

export default function PlaylistTable({ data, type }: PlaylistTableProps) {
  const { activeId } = usePlayer();
  const isActiveTrack = (id: string) => (activeId ?? '-1') === id;

  const columns = new ColumnBuilder()
    .AddPosition(isActiveTrack)
    .AddTitle(isActiveTrack)
    .AddAlbum()
    .AddDate('Date Added')
    .AddDuration()
    .Build();

  return <SongTable data={data} columns={columns} type={type} />;
}
