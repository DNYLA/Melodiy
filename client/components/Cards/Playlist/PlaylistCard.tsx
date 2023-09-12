'use client';

import { getImageUrl } from '@/lib/helpers';
import { getDefaultImage } from '@/utils';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export interface IPlaylistCard {
  title: string;
  owner: string;
  imageUrl: string;
  redirect?: string;
}

const PlaylistCard: React.FC<IPlaylistCard> = ({
  title,
  owner,
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
      onClick={handleRedirect}
      className="group min-w-[200px] cursor-pointer duration-300 ease-in-out hover:scale-110"
    >
      <Image
        className="rounded-lg"
        src={imageUrl ? getImageUrl(imageUrl) : getDefaultImage()}
        width={200}
        height={200}
        alt="Playlist Cover"
      />
      <div className="mt-1">
        <p className="cursor-pointer truncate text-lg font-bold hover:underline ">
          {title}
        </p>
        <p className="text-sm text-inactive hover:underline">{owner}</p>
      </div>
    </div>
  );
};

export default PlaylistCard;
