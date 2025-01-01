import { Album, CollectionType } from '@melodiy/types';
import { getDefaultPlaylistImage } from '../../utils';
import CollectionContainer from '../Header/CollectionContainer';
import TrackTable from './';
import { ColumnBuilder } from './Helpers/ColumnBuilder';

interface AlbumTableProps {
  data: Album;
}

export function AlbumTable({ data }: AlbumTableProps) {
  const columns = new ColumnBuilder()
    .AddPosition(data.id)
    .AddTitle(data.id)
    .AddAlbum()
    .AddDuration()
    .Build();

  const getOwners = () => {
    return data.artists.map((artist) => {
      return {
        name: artist.name,
        cover: artist.image,
        redirect: `/artist/${artist.id}`,
      };
    });
  };

  return (
    <div className="flex flex-col w-full gap-y-5">
      <CollectionContainer
        id={data.id}
        title={data.title}
        cover={data.image}
        coverFallback={getDefaultPlaylistImage()}
        type={CollectionType.Album}
        releaseDate={new Date(data.createdAt)}
        tracks={data.tracks}
        owner={getOwners()}
      >
        <TrackTable
          data={data.tracks}
          columns={columns}
          collectionId={data.id}
          type={CollectionType.Album}
        />
      </CollectionContainer>
    </div>
  );
}
