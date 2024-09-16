import { CollectionType, Track } from '@melodiy/types';
import TrackTable from './';
import { ColumnBuilder } from './Helpers/ColumnBuilder';

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
    <div className="flex flex-col w-full gap-y-5">
      <div className="px-6 py-3 pt-2 pr-5">
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
