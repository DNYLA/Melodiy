import { ArtistPreview } from '@melodiy/types';
import { Link, useNavigate } from '@tanstack/react-router';
import { Image } from '../Data';
import { ArtistList } from '../Data/ArtistList';

export enum AlbumCardSize {
  Small = 150,
  Medium = 180,
  Large = 200,
}

export interface AlbumCardProps {
  id: string;
  title: string;
  artists: ArtistPreview[];
  imageSrc?: string;
  size?: AlbumCardSize;
}

function AlbumCard({
  id,
  title,
  artists,
  imageSrc,
  size = AlbumCardSize.Medium,
}: AlbumCardProps) {
  return (
    <Link to={'/album/$id'} params={{ id }}>
      <div
        className="group flex cursor-pointer flex-col gap-y-1 duration-300 ease-in-out hover:scale-110"
        style={{ minWidth: size }}
      >
        <Image
          draggable={false}
          className={'rounded-md'}
          style={{ maxHeight: size }}
          src={imageSrc}
          width={size}
          height={size}
          alt="Artist Picture"
        />
        <div className="m-0 flex flex-col gap-0 p-0" style={{ maxWidth: size }}>
          <p className="max-w-[200px] truncate font-bold hover:underline">
            {title}
          </p>
          <ArtistList artists={artists} />
        </div>
      </div>
    </Link>
  );
}

export { AlbumCard };
