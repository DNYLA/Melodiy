import { CollectionType, Playlist } from '@melodiy/types';
import TrackTable from './';
import CollectionHeader from '../Header/CollectionHeader';
import { ColumnBuilder } from './Helpers/ColumnBuilder';

interface PlaylistTableProps {
  data: Playlist;
}

export function PlaylistTable({ data }: PlaylistTableProps) {
  const columns = new ColumnBuilder()
    .AddPosition(data.id)
    .AddTitle(data.id)
    .AddAlbum()
    .AddDate('Date Added')
    .AddDuration()
    .Build();

  return (
    <div className="flex w-full flex-col gap-y-5">
      <CollectionHeader
        title={data.title}
        cover={data.image}
        type={CollectionType.Playlist}
        releaseDate={new Date(data.createdAt)}
        tracks={data.tracks}
        owner={{
          name: data.user.username,
          redirect: `/user/${data.user.id}`,
        }}
      />
      <div className="px-6 py-3 pr-5 pt-2">
        <TrackTable
          data={data.tracks}
          columns={columns}
          collectionId={data.id}
          type={CollectionType.Playlist}
        />
      </div>
    </div>
  );
}
