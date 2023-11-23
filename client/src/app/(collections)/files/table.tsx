'use client';

import TrackTable from '@/app/(collections)/(components)/Table';
import { ColumnBuilder } from '@/app/(collections)/(components)/Table/ColumnBuilder';
import usePlayer from '@/hooks/stores/usePlayer';
// import usePlayer from '@/hooks/stores/usePlayer';
import { Track } from '@/types';
import { CollectionType } from '@/types/collections';

interface FilesTableProps {
  data: Track[];
}

export default function FilesTable({ data }: FilesTableProps) {
  const { active } = usePlayer();
  const isActiveTrack = (id: string) =>
    active?.id == id && active.collectionId == 'files';

  const columns = new ColumnBuilder()
    .AddPosition(isActiveTrack)
    .AddTitle(isActiveTrack)
    .AddAlbum()
    .AddDate('Date Added')
    .AddDuration()
    .Build();

  return (
    <TrackTable
      data={data}
      columns={columns}
      collectionId="files"
      type={CollectionType.Files}
    />
  );
}
