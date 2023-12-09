'use client';

import AlbumCard, { AlbumCardSize } from '@/components/Cards/Album';
import { Album } from '@/types/playlist';
import { FC } from 'react';

export interface CollectionListProps {
  header: string;
  albums: Album[];
  viewMoreRedirect?: string;
}

const CollectionList: FC<CollectionListProps> = ({
  header,
  albums,
  viewMoreRedirect,
}) => {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between align-middle">
        <h1 className="text-xl font-bold">{header}</h1>
        {viewMoreRedirect && (
          <span className="cursor-pointer text-center align-middle text-sm font-light uppercase transition-all delay-100 ease-in-out hover:opacity-80">
            View All
          </span>
        )}
      </div>

      <div className="flex gap-x-5 overflow-x-auto overflow-y-hidden pb-3">
        {albums.map((album) => (
          <AlbumCard
            title={album.title}
            artists={album.artists}
            imageUrl={album.image}
            size={AlbumCardSize.Large}
            redirect={`/album/${album.id}`}
          />
        ))}
      </div>
    </div>
  );
};

export default CollectionList;
