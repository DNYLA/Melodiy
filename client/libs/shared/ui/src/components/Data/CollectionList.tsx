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
      <div className="mb-1 flex items-center justify-between align-middle">
        <h1 className="text-xl font-bold">{header}</h1>
        {redirect && (
          <span className="cursor-pointer text-center align-middle text-sm font-light uppercase transition-all delay-100 ease-in-out hover:opacity-80">
            View All
          </span>
        )}
      </div>

      <div className="flex gap-x-5 overflow-x-auto overflow-y-hidden pb-3">
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
