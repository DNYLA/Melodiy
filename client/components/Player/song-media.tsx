'use client';

import useLoadFile from '@/hooks/useLoadImage';
import { Song } from '@/types/playlist';
import Image from 'next/image';
import React from 'react';

interface SongMediaProps {
  data: Song;
  onClick?: (id: string) => void;
}

const SongMedia: React.FC<SongMediaProps> = ({ data, onClick }) => {
  const imageUrl = useLoadFile(data.coverPath);

  const handleClick = () => {
    if (onClick) {
      return onClick(data.uid);
    }

    //TODO: Default turn on player
  };

  return (
    <div
      onClick={handleClick}
      className="flex items-center gap-x-3 cursor-poiner hover:bg-neutral-600/25 w-full p-2 rounded-md cursor-pointer"
    >
      <div className="relative rounded-md min-h-[48px] min-w-[48px] overflow-hidden">
        <Image
          fill
          src={imageUrl || 'images/default_playlist.png'}
          alt="Media Item"
          className="object-cover"
        />
      </div>
      <div className="flex flex-col gap-y-1 overflow-hidden">
        <p className="text-white truncate hover:underline">{data.title}</p>
        <p className="text-neutral-400 text-sm truncate hover:underline">
          {data.artist}
        </p>
      </div>
    </div>
  );
};

export default SongMedia;
