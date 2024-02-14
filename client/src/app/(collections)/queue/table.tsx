import TrackTable from '@/app/(collections)/(components)/Table';
import { ColumnBuilder } from '@/app/(collections)/(components)/Table/ColumnBuilder';
import { Track } from '@/types';
import { CollectionType } from '@/types/collections';

interface QueueTableProps {
  collectionId: string;
  data: Track[];
}

export default function QueueTable({ data, collectionId }: QueueTableProps) {
  const columns = new ColumnBuilder()
    .AddPosition(collectionId)
    .AddTitle(collectionId)
    .AddAlbum()
    .AddDate('Date Added')
    .AddDuration()
    .Build();

  return (
    <div className="flex w-full flex-col gap-y-5">
      <div className="px-6 py-3 pr-5 pt-2">
        <TrackTable
          data={data}
          columns={columns}
          collectionId={collectionId}
          type={CollectionType.Search}
        />
      </div>
    </div>
  );
}
