import { CollectionType, Track } from '@melodiy/types';
import CollectionHeader from '../Header/CollectionHeader';
import TrackTable from './';
import { ColumnBuilder } from './Helpers/ColumnBuilder';

interface FilesTableProps {
  username: string; //Pass it trough as the server already got the user for us
  data: Track[];
}

const FILES_COLLECTION_ID = 'files';

export function FilesTable({ data, username }: FilesTableProps) {
  const columns = new ColumnBuilder()
    .AddPosition(FILES_COLLECTION_ID)
    .AddTitle(FILES_COLLECTION_ID)
    .AddAlbum()
    .AddDate('Date Added')
    .AddDuration()
    .Build();

  return (
    <div className="flex flex-col w-full gap-y-5">
      <CollectionHeader
        title={'Your Files'}
        type={CollectionType.Files}
        releaseDate={new Date()}
        tracks={data}
        owner={{
          name: username,
          redirect: `/user/${username}`,
        }}
      />
      <div className="px-6 py-3 pt-2 pr-5">
        <TrackTable
          data={data}
          columns={columns}
          collectionId={FILES_COLLECTION_ID}
          type={CollectionType.Files}
        />
      </div>
    </div>
  );
}
