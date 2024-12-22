import {
  AddtoQueueIcon,
  ArtistIcon,
  BulletPointIcon,
  DownloadIcon,
  MoreIcon,
  PauseIcon,
  PlayIcon,
  ShareIcon,
  ShuffleIcon,
} from '@melodiy/icons';
import { CollectionType, Track } from '@melodiy/types';
import { useNavigate } from '@melodiy/router';
import dayjs from 'dayjs';
import { FC, useRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { Image } from '../../components/Data/Image';
import { IconButton } from '../../components/Inputs';
import { usePlayerIcon } from '../../components/Player/hooks/usePlayerIcon';

type CollectionOwner = {
  name: string;
  cover?: string;
  redirect: string;
};

export interface CollectionContainerProps {
  id: string;
  title: string;
  type: CollectionType;
  cover?: string;
  releaseDate: Date;
  tracks: Track[];
  owner: CollectionOwner | CollectionOwner[]; //A Collection can be a playlist which is owned by a user or an album, ep, single owned by artists(s)
  children: React.ReactNode;
}

const CollectionContainer: FC<CollectionContainerProps> = ({
  id,
  title,
  cover,
  releaseDate,
  tracks,
  owner,
  children,
}) => {
  const isAlbumPlaying = usePlayerIcon(id);
  const PlayerActionIcon = isAlbumPlaying ? PauseIcon : PlayIcon;
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate(); //Link should be preffered however the route we are navigating to can be multiple different routes
  const iconSize = 60;
  const calculateDuration = () => {
    if (!tracks || tracks.length === 0) return '0 Minutes';
    const totalDuration = tracks.reduce(
      (total, { duration }) => total + duration,
      0
    );
    const totalMins = totalDuration / 60000;

    return `${Math.round(totalMins)} Minutes`;
  };

  const getCollectionDetails = () => {
    const trackAmount = tracks?.length ?? 0;
    const duration = calculateDuration();
    const date = dayjs(releaseDate ?? new Date());

    return [date.year(), `${trackAmount} Songs`, duration];
  };

  const getPrimaryCollectionOwner = () => {
    if (Array.isArray(owner)) {
      return owner[0]?.name;
    }

    return owner.name;
  };

  const getCollectionOwners = () => {
    return Array.isArray(owner) ? owner : [owner];
  };

  const getRedirect = () => {
    if (Array.isArray(owner)) {
      return owner[0]?.redirect;
    }

    return owner.redirect;
  };

  return (
    <div className="flex flex-row w-full">
      <div className="flex flex-col w-3/4 px-8 pt-6 gap-y-4" ref={ref}>
        <p className="text-4xl font-bold">{title}</p>

        <div className="flex items-center gap-x-3">
          <div className="flex items-center gap-x-1">
            <ArtistIcon width={40} height={40} />
            <p
              className="cursor-pointer text-content hover:underline"
              onClick={() => navigate({ to: getRedirect() })}
            >
              {getPrimaryCollectionOwner()}
            </p>
          </div>

          {getCollectionDetails().map((stat) => (
            <>
              <BulletPointIcon />
              <p className="text-base-accent">{stat}</p>
            </>
          ))}
        </div>

        <div className="flex gap-x-4">
          <IconButton
            className="fill-primary stroke-none"
            width={iconSize}
            height={iconSize}
            icon={PlayerActionIcon}
            // onClick={handlePlay}
          />
          <IconButton
            className="stroke-base-accent"
            width={iconSize}
            height={iconSize}
            icon={ShuffleIcon}
            // onClick={onPlayPrevious}
          />
          <IconButton
            className="stroke-base-accent"
            width={iconSize}
            height={iconSize}
            icon={AddtoQueueIcon}
            // onClick={onPlayNext}
          />
          <IconButton
            className="stroke-base-accent"
            width={iconSize}
            height={iconSize}
            icon={DownloadIcon}
            // onClick={toggleShuffle}
          />
          <IconButton
            className="stroke-base-accent"
            width={iconSize}
            height={iconSize}
            icon={ShareIcon}
            // onClick={toggleRepeat}
          />

          <IconButton
            className="stroke-base-accent fill-base-accent"
            width={iconSize}
            height={iconSize}
            icon={MoreIcon}
            // onClick={toggleRepeat}
          />
        </div>

        <div>{children}</div>
      </div>

      <div className="flex flex-col w-1/4 mx-5 my-10 gap-y-3">
        <Image
          src={cover}
          draggable={false}
          className={twMerge('z-5 rounded-xl w-full object-cover')}
          alt={'Collection cover'}
        />
        <p className="text-xl font-bold md:text-2xl lg:text-3xl">{title}</p>

        <div className="flex flex-col mt-2 gap-y-5">
          {getCollectionOwners().map((owner) => (
            <div
              className="flex items-center cursor-pointer gap-x-5 group"
              onClick={() => navigate({ to: owner.redirect })}
            >
              <Image
                src={owner.cover}
                draggable={false}
                className={twMerge('rounded-full w-20 h-20 object-cover')}
                alt={'Collection cover'}
              />
              <span className="text-lg font-medium duration-300 cursor-pointer text-base-accent group-hover:text-content">
                {owner.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CollectionContainer;
