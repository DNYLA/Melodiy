'use client';

import Image from '@/components/Data/Image';
import { getDefaultImage } from '@/lib/utils';
import { User } from '@/types/user';
import { useRouter } from 'next/navigation';

export enum PlaylistCardSize {
  Small = 150,
  Medium = 180,
  Large = 200,
}

export interface IPlaylistCard {
  id: string;
  title: string;
  owner?: User;
  imageUrl?: string;
  size?: PlaylistCardSize;
}

const PlaylistCard: React.FC<IPlaylistCard> = ({
  id,
  title,
  owner,
  imageUrl,
  size = PlaylistCardSize.Medium,
}) => {
  const router = useRouter();

  const handleRedirect = (redirect: string) => {
    if (!redirect) return;

    router.push(redirect);
  };

  return (
    <div
      className="group flex cursor-pointer flex-col gap-y-1 duration-300 ease-in-out hover:scale-110"
      style={{ minWidth: size }}
      onClick={() => handleRedirect(`/playlist/${id}`)}
    >
      <Image
        draggable={false}
        className={'rounded-md'}
        style={{ minHeight: size, maxHeight: size }}
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
        {owner && (
          <span
            key={owner.id}
            onClick={() => handleRedirect(`/user/${owner.id}`)}
            className="m-0 truncate p-0 text-sm font-light text-[#969696] hover:underline"
          >
            {owner.username}
          </span>
        )}
      </div>
    </div>
  );
};

export default PlaylistCard;
