import { Album } from '@melodiy/types';
import {
  CollectionCard,
  CollectionCardSize,
} from '../components/Cards/CollectionCard';

export interface CollectionListProps {
  header: string;
  items: Album[];
  redirect?: string;
}

function CollectionList({ header, items, redirect }: CollectionListProps) {
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
        {items.map((album) => (
          <CollectionCard
            id={album.id}
            key={album.id}
            title={album.title}
            artists={album.artists}
            imageSrc={album.image}
            size={CollectionCardSize.Large}
          />
        ))}
      </div>
    </div>
  );
}

export { CollectionList };
