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

const FILES_COLLECTION_ID = 'files';

export default function FilesTable({ data }: FilesTableProps) {
  const { active } = usePlayer();
  const isActiveTrack = (id: string) =>
    active?.id == id && active.collectionId == 'files';

  const columns = new ColumnBuilder()
    .AddPosition(FILES_COLLECTION_ID)
    .AddTitle(FILES_COLLECTION_ID)
    .AddAlbum()
    .AddDate('Date Added')
    .AddDuration()
    .Build();

  return (
    <TrackTable
      data={data}
      columns={columns}
      collectionId={FILES_COLLECTION_ID}
      type={CollectionType.Files}
    />
  );
}
