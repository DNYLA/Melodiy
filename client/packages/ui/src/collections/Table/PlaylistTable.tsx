import { CollectionType, Playlist } from '@melodiy/types';
import { getDefaultPlaylistImage } from '../../utils';
import CollectionContainer from '../Header/CollectionContainer';
import TrackTable from './';
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
    <div className="flex flex-col w-full gap-y-5">
      <CollectionContainer
        id={data.id}
        title={data.title}
        cover={data.image}
        coverFallback={getDefaultPlaylistImage()}
        type={CollectionType.Playlist}
        releaseDate={new Date(data.createdAt)}
        tracks={data.tracks}
        owner={{
          name: data.user.username,
          redirect: `/user/${data.user.id}`,
        }}
      >
        <TrackTable
          data={data.tracks}
          columns={columns}
          collectionId={data.id}
          type={CollectionType.Playlist}
        />
      </CollectionContainer>
    </div>
  );
}
