import { CollectionType, Track } from '@melodiy/types';
import TrackTable from './';
import { ColumnBuilder } from './Helpers/ColumnBuilder';

export interface SearchTableProps {
  data: Track[];
}

const SEARCH_COLLECTION_ID = 'files';

const SearchTable: React.FC<SearchTableProps> = ({ data }) => {
  const columns = new ColumnBuilder()
    .AddPosition(SEARCH_COLLECTION_ID)
    .AddTitle(SEARCH_COLLECTION_ID)
    .AddAlbum()
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

export { SearchTable };
