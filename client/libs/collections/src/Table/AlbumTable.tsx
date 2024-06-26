import { Album, CollectionType } from '@melodiy/types';
import CollectionHeader from '../Header/CollectionHeader';
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

  return (
    <div className="flex flex-col w-full gap-y-5">
      <CollectionHeader
        title={data.title}
        cover={data.image}
        type={CollectionType.Album}
        releaseDate={new Date(data.createdAt)}
        tracks={data.tracks}
        owner={{
          name: data.artists[0].name,
          redirect: `/artist/${data.artists[0].id}`,
        }}
      />
      <div className="px-6 py-3 pt-2 pr-5">
        <TrackTable
          data={data.tracks}
          columns={columns}
          collectionId={data.id}
          type={CollectionType.Album}
        />
      </div>
    </div>
  );
}
