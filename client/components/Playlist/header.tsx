import ImageOverlay from '@/app/playlist/[id]/components/image-overlay';
import { Playlist } from '@/types/playlist';
import React from 'react';
import { BsFillPlayFill } from 'react-icons/bs';
import { FiEdit2 } from 'react-icons/fi';
import dayjs from 'dayjs';

interface Props {
  data: Playlist;
}

export default function PlaylistHeader({ data }: Props) {
  const getTotalDuration = () => {
    if (!data.tracks) return '0 MINUTES';
    const totalDuration = data.tracks.reduce(
      (total, { duration }) => total + duration,
      0
    );
    const totalMins = totalDuration / 60000;

    return `${Math.round(totalMins)} MINUTES`;
  };

  const getPlaylistDetails = () => {
    const trackAmount = data.tracks?.length ?? 0;
    const duration = getTotalDuration();
    const date = dayjs(data.createdAt ?? new Date());

    return `${trackAmount} SONGS • ${duration} • ${date.year()}`;
  };

  return (
    <div className="flex gap-x-4">
      <div className="group relative cursor-pointer">
        <div className="absolute z-10 hidden group-hover:flex flex-col cursor-pointer text-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 place-items-center ">
          <FiEdit2
            size={30}
            className="flex justify-center content-center snap-center center object-center place-items-center align-middle"
          />
          <span className="text-md">Select Photo</span>
        </div>
        <ImageOverlay
          src={data.imagePath ? data.imagePath : 'images/default_playlist.png'}
        />
      </div>
      <div>
        <div>
          <p className="text-inactive">Public Playlist</p>
          <p className="text-xl md:text-2xl lg:text-3xl font-bold">
            {data.title}
          </p>
          <p className="text-inactive cursor-pointer hover:underline">
            {data.user.username}
          </p>
          <p className="font-light">{getPlaylistDetails()}</p>
        </div>

        <div className="mt-8">
          {/* TODO: Update Button Hover Effect */}
          <button className="flex items-center bg-primary px-3 py-[2px] gap-x-1 rounded text-cneter group">
            <BsFillPlayFill size={25} className="" />
            <p className="group-hover:text-inactive">PLAY</p>
          </button>
        </div>
      </div>
    </div>
  );
}
