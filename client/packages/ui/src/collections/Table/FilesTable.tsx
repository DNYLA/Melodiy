import { CollectionType, Track, User } from '@melodiy/types';
import { getDefaultUserImage } from '../../utils';
import CollectionContainer from '../Header/CollectionContainer';
import TrackTable from './';
import { ColumnBuilder } from './Helpers/ColumnBuilder';

interface FilesTableProps {
  user: User;
  data: Track[];
}

const FILES_COLLECTION_ID = 'files';

export function FilesTable({ data, user }: FilesTableProps) {
  const columns = new ColumnBuilder()
    .AddPosition(FILES_COLLECTION_ID)
    .AddTitle(FILES_COLLECTION_ID)
    .AddAlbum()
    .AddDate('Date Added')
    .AddDuration()
    .Build();

  return (
    <div className="flex flex-col w-full gap-y-5">
      <CollectionContainer
        id={'Your Files'}
        title={'Your Files'}
        cover={user.avatar}
        coverFallback={getDefaultUserImage()}
        type={CollectionType.MyFiles}
        releaseDate={new Date()}
        tracks={data}
        owner={{
          name: user.username,
          redirect: `/user/${user.username}`,
        }}
      >
        <div className="px-6 py-3 pt-2 pr-5">
          <TrackTable
            data={data}
            columns={columns}
            collectionId={FILES_COLLECTION_ID}
            type={CollectionType.MyFiles}
          />
        </div>
      </CollectionContainer>
    </div>
  );
}
