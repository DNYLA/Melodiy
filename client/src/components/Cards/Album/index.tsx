'use client';

import Image from '@/components/Data/Image';
import ArtistList from '@/components/Utils/Player/artist-list';
import { getDefaultImage } from '@/lib/utils';
import { ArtistPreview } from '@/types';
import { useRouter } from 'next/navigation';

export enum AlbumCardSize {
  Small = 150,
  Medium = 180,
  Large = 200,
}

export interface IAlbumCard {
  title: string;
  artists: ArtistPreview[];
  imageUrl?: string;
  redirect?: string;
  size?: AlbumCardSize;
}

const AlbumCard: React.FC<IAlbumCard> = ({
  title,
  artists,
  imageUrl,
  redirect,
  size = AlbumCardSize.Medium,
}) => {
  const router = useRouter();

  const handleRedirect = () => {
    if (!redirect) return;

    router.push(redirect);
  };

  return (
    <div
      className="group flex cursor-pointer flex-col gap-y-1 duration-300 ease-in-out hover:scale-110"
      style={{ minWidth: size }}
      onClick={handleRedirect}
    >
      <Image
        draggable={false}
        className={'rounded-md'}
        style={{ maxHeight: size }}
        priority={true}
        src={imageUrl ?? getDefaultImage()}
        width={size}
        height={size}
        alt="Artist Picture"
        quality={100}
      />
      <div className="m-0 flex flex-col gap-0 p-0" style={{ maxWidth: size }}>
        <p className="max-w-[200px] truncate font-bold hover:underline">
          {title}
        </p>
        <ArtistList artists={artists} />
      </div>
    </div>
  );
};

export default AlbumCard;
