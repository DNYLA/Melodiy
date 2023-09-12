'use client';

import useOnPlay from '@/hooks/useOnPlay';
import { getImageUrl } from '@/lib/helpers';
import { Song } from '@/types/playlist';
import Image from 'next/image';
import { BsFillPlayFill } from 'react-icons/bs';

export interface ITopResult {
  song: Song;
}

const TopResult: React.FC<ITopResult> = ({ song }) => {
  const onPlay = useOnPlay();

  const handlePlay = () => {
    onPlay(song.uid, [song]);
  };
  return (
    <div
      className="group flex cursor-pointer justify-between rounded-md bg-[#1d1b1b] p-3 transition-all duration-200 ease-in-out hover:scale-105 hover:bg-[#313030] "
      onClick={handlePlay}
    >
      <div className="flex">
        <Image
          className="rounded-full"
          src={getImageUrl(song.coverPath)}
          alt="Top Result cover"
          width={100}
          height={100}
        />
        <div className="ml-4 pt-5">
          <p className="text-lg hover:underline">{song.title}</p>
          <p className="text-sm font-light text-neutral-400 hover:underline">
            {song.artist}
          </p>
        </div>
      </div>

      {/* h-0.5 bg-red scale-x-0 group-hover:scale-100 transition-transform origin-left rounded-full duration-300 ease-out */}
      <div className="flex h-[55px] w-[55px] scale-0 self-center rounded-full bg-primary p-3 transition-all duration-200 ease-in-out hover:scale-110 group-hover:flex group-hover:scale-100">
        <BsFillPlayFill className="flex self-center" size={40} />
      </div>
    </div>
  );
};

export default TopResult;
