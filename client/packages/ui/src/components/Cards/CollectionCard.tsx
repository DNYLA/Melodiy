import { ArtistPreview } from '@melodiy/types';
import { Link } from '@melodiy/router';
import { ArtistList } from '../Data/ArtistList';
import { Image } from '../Data/Image';

export enum CollectionCardSize {
  Small = 150,
  Medium = 180,
  Large = 250,
}

export interface CollectionCardProps {
  id: string;
  title: string;
  artists: ArtistPreview[];
  imageSrc?: string;
  size?: CollectionCardSize;
}

function CollectionCard({
  id,
  title,
  artists,
  imageSrc,
  size = CollectionCardSize.Medium,
}: CollectionCardProps) {
  return (
    <Link to={'/album/$id'} params={{ id }}>
      <div className="flex flex-col duration-300 ease-in-out cursor-pointer group gap-y-1 hover:scale-110">
        <Image
          draggable={false}
          className={'flex w-full h-full object-cover rounded-md'}
          src={imageSrc}
          width={size}
          height={size}
          alt={`${title} picture`}
        />
        <div className="flex flex-col gap-0 p-0 m-0" style={{ maxWidth: size }}>
          <p className="max-w-[180px] truncate font-bold hover:underline">
            {title}
          </p>
          <ArtistList artists={artists} />
        </div>
      </div>
    </Link>
  );
}

export { CollectionCard };
