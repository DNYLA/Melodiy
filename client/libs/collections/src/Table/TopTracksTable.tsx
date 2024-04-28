import { CollectionType, Track } from '@melodiy/types';
import { ColumnBuilder } from './Helpers/ColumnBuilder';
import TrackTable from '.';

export interface TopTracksTableProps {
  tracks: Track[];
}

const TOPTRACKS_COLLECTION_ID = 'top_tracks';

function TopTracksTable({ tracks }: TopTracksTableProps) {
  const columns = new ColumnBuilder()
    // .AddPosition(TOPTRACKS_COLLECTION_ID)
    .AddTitle(TOPTRACKS_COLLECTION_ID)
    .AddAlbum()
    .AddDuration()
    .Build();

  return (
    <div className="flex flex-col">
      <TrackTable
        data={tracks}
        columns={columns}
        collectionId={TOPTRACKS_COLLECTION_ID}
        type={CollectionType.Search}
      />
    </div>
  );
}

export { TopTracksTable };
