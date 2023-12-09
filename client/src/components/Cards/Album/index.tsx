'use client';

import Image from '@/components/Data/Image';
import ArtistList from '@/components/Utils/Player/artist-list';
import { ArtistPreview } from '@/types';
import { useRouter } from 'next/navigation';

export interface IAlbumCard {
  title: string;
  artists: ArtistPreview[];
  imageUrl: string;
  redirect?: string;
}

const AlbumCard: React.FC<IAlbumCard> = ({
  title,
  artists,
  imageUrl,
  redirect,
}) => {
  const router = useRouter();

  const handleRedirect = () => {
    if (!redirect) return;

    router.push(redirect);
  };

  return (
    <div
      className="group min-w-[200px] cursor-pointer duration-300 ease-in-out hover:scale-110"
      onClick={handleRedirect}
    >
      <Image
        draggable={false}
        className={'max-h-[180px] rounded-lg'}
        priority={true}
        src={imageUrl}
        width={180}
        height={180}
        alt="Artist Avatar"
        quality={100}
      />
      <div className="mt-1 max-w-[180px]">
        <p className="cursor-pointer truncate text-lg font-bold hover:underline">
          {title}
        </p>
        <ArtistList artists={artists} />
      </div>
    </div>
  );
};

export default AlbumCard;
