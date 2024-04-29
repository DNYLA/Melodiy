import { CollectionType, Track } from '@melodiy/types';
import { ColumnBuilder } from './Helpers/ColumnBuilder';
import TrackTable from './';

interface QueueTableProps {
  collectionId: string;
  data: Track[];
}

function QueueTable({ data, collectionId }: QueueTableProps) {
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

export { QueueTable };
