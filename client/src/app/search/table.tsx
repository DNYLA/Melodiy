'use client';

import TrackTable from '@/app/(collections)/(components)/Table';
import { ColumnBuilder } from '@/app/(collections)/(components)/Table/ColumnBuilder';
import { Track } from '@/types';
import { CollectionType } from '@/types/collections';

export interface ISearchTable {
  data: Track[];
}

const SEARCH_COLLECTION_ID = 'files';

const SearchTable: React.FC<ISearchTable> = ({ data }) => {
  const columns = new ColumnBuilder()
    .AddPosition(SEARCH_COLLECTION_ID)
    .AddTitle(SEARCH_COLLECTION_ID)
    .AddAlbum()
    // .AddDate('Date Added')
    .AddDuration()
    .Build();

  return (
    <div className="flex flex-col">
      <TrackTable
        data={data}
        columns={columns}
        collectionId={SEARCH_COLLECTION_ID}
        type={CollectionType.Search}
      />
    </div>
  );
};

export default SearchTable;
