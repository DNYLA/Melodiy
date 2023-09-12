'use client';

import { getImageUrl } from '@/lib/helpers';
import { Song } from '@/types/playlist';
import { getDefaultImage } from '@/utils';
import Image from 'next/image';
import React from 'react';

interface SongMediaProps {
  data: Song;
  onClick?: (id: string) => void;
}

const SongMedia: React.FC<SongMediaProps> = ({ data, onClick }) => {
  const handleClick = () => {
    if (onClick) {
      return onClick(data.uid);
    }

    //TODO: Default turn on player
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-poiner flex w-full cursor-pointer items-center gap-x-3 rounded-md p-2 hover:bg-neutral-600/25"
    >
      <div className="relative min-h-[48px] min-w-[48px] overflow-hidden rounded-md">
        <Image
          fill
          src={data.coverPath ? getImageUrl(data.coverPath) : getDefaultImage()}
          alt="Media Item"
          className="object-cover"
        />
      </div>
      <div className="flex flex-col gap-y-1 overflow-hidden">
        <p className="truncate text-white hover:underline">{data.title}</p>
        <p className="truncate text-sm text-neutral-400 hover:underline">
          {data.artist}
        </p>
      </div>
    </div>
  );
};

export default SongMedia;
