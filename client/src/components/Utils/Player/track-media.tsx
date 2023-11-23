'use client';

import Image from '@/components/Data/Image';
import { getDefaultImage } from '@/lib/utils';
import { Track } from '@/types';
import { useRouter } from 'next/navigation';
import React from 'react';

interface TrackMediaProps {
  data: Track;
  onClick?: (id: string) => void;
}

const TrackMedia: React.FC<TrackMediaProps> = ({ data, onClick }) => {
  const router = useRouter();

  const handleClick = () => {
    if (onClick) {
      return onClick(data.id);
    }

    //TODO: Default turn on player
  };

  return (
    // <SongContextMenu
    //   trackId={data.uid}
    //   ownerId={data.user?.id}
    //   key={data.uid}
    //   type={PlaylistType.Playlist}
    // >
    <div
      onClick={handleClick}
      className="cursor-poiner flex w-full cursor-pointer items-center gap-x-3 rounded-md p-2 hover:bg-neutral-600/25"
    >
      <div className="relative min-h-[48px] min-w-[48px] overflow-hidden rounded-md">
        <Image
          fill
          src={data.image ?? getDefaultImage()}
          alt="Media Item"
          className="object-cover"
        />
      </div>
      <div className="flex flex-col gap-y-1 overflow-hidden">
        <p className="truncate text-white hover:underline">{data.title}</p>
        {data.artists.map(({ id, name }) => (
          <p
            onClick={() => router.push(`/artist/${id}`)}
            className="truncate text-sm text-neutral-400 hover:underline"
          >
            {name}
          </p>
        ))}
      </div>
    </div>
    // </SongContextMenu>
  );
};

export default TrackMedia;
