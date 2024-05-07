import { Album } from '@melodiy/types';
import { AlbumCard, AlbumCardSize } from '../Cards/AlbumCard';

export interface CollectionListProps {
  header: string;
  albums: Album[];
  redirect?: string;
}

function CollectionList({ header, albums, redirect }: CollectionListProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1 align-middle">
        <h1 className="text-xl font-bold">{header}</h1>
        {redirect && (
          <span className="text-sm font-light text-center uppercase align-middle transition-all ease-in-out delay-100 cursor-pointer hover:opacity-80">
            View All
          </span>
        )}
      </div>

      <div className="flex pb-3 overflow-x-auto overflow-y-hidden gap-x-5">
        {albums.map((album) => (
          <AlbumCard
            id={album.id}
            key={album.id}
            title={album.title}
            artists={album.artists}
            imageSrc={album.image}
            size={AlbumCardSize.Large}
          />
        ))}
      </div>
    </div>
  );
}

export { CollectionList };
