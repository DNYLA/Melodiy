'use client';
import SongTable from '@/components/Tables/SongTable';
import { ColumnBuilder } from '@/components/Tables/column-builder';
import usePlayer from '@/hooks/stores/usePlayer';
import { PlaylistType } from '@/types';
import { Song } from '@/types/playlist';

interface FilesTableProps {
  data: Song[];
  type: PlaylistType;
}

export default function FilesTable({ data, type }: FilesTableProps) {
  const { activeId } = usePlayer();
  const isActiveTrack = (id: string) => (activeId ?? '-1') === id;

  const columns = new ColumnBuilder()
    .AddPosition(isActiveTrack)
    .AddTitle(isActiveTrack)
    .AddAlbum()
    .AddDate('Date Created')
    .AddDuration()
    .Build();

  return <SongTable data={data} columns={columns} type={type} />;
}
