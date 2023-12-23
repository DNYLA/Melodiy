'use client';

import TrackTable from '@/app/(collections)/(components)/Table';
import { ColumnBuilder } from '@/app/(collections)/(components)/Table/ColumnBuilder';
import { Track } from '@/types';
import { CollectionType } from '@/types/collections';

export interface ITopTracksTable {
  tracks: Track[];
}

const TOPTRACKS_COLLECTION_ID = 'top_tracks';

const TopTracksTable: React.FC<ITopTracksTable> = ({ tracks }) => {
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
};

export default TopTracksTable;
