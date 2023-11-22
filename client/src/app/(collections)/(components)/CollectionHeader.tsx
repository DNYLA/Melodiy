'use client';

import ImageOverlay from '@/app/(collections)/(components)/ImageOverlay';
import { collectionTypeToString } from '@/lib/utils';
import { Track } from '@/types';
import { CollectionType } from '@/types/collections';
import dayjs from 'dayjs';
import { FC } from 'react';
import { BsFillPlayFill } from 'react-icons/bs';

export interface CollectionHeaderProps {
  title: string;
  type: CollectionType;
  cover?: string;
  releaseDate: Date;
  tracks: Track[];
  owner: { name: string; redirect: string };
}

const CollectionHeader: FC<CollectionHeaderProps> = ({
  title,
  type,
  cover,
  releaseDate,
  tracks,
  owner,
}) => {
  const calculateDuration = () => {
    if (!tracks || tracks.length === 0) return '0 MINUTES';
    const totalDuration = tracks.reduce(
      (total, { duration }) => total + duration,
      0
    );
    const totalMins = totalDuration / 60000;

    return `${Math.round(totalMins)} MINUTES`;
  };

  const getCollectionDetails = () => {
    const trackAmount = tracks?.length ?? 0;
    const duration = calculateDuration();
    const date = dayjs(releaseDate ?? new Date());

    return `${trackAmount} SONGS • ${duration} • ${date.year()}`;
  };

  return (
    <div className="flex gap-x-4">
      <ImageOverlay src={cover ?? 'images/default_playlist.png'} />
      <div>
        <div>
          <p className="text-inactive">{collectionTypeToString(type)}</p>
          <p className="text-xl font-bold md:text-2xl lg:text-3xl">{title}</p>
          <p className="cursor-pointer text-inactive hover:underline">
            {owner.name}
          </p>
          <p className="font-light">{getCollectionDetails()}</p>
        </div>

        <div className="mt-8">
          {/* TODO: Update Button Hover Effect */}
          <button className="text-cneter group flex items-center gap-x-1 rounded bg-primary px-3 py-[2px]">
            <BsFillPlayFill size={25} className="" />
            <p className="group-hover:text-inactive">PLAY</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CollectionHeader;
