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
      className="group flex cursor-pointer justify-between rounded-md bg-[#1d1b1b] p-3 hover:bg-[#313030]"
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

      <div className="hidden h-[55px] w-[55px] self-center rounded-full bg-primary p-3 hover:scale-110 group-hover:flex">
        <BsFillPlayFill className="flex self-center" size={40} />
      </div>
    </div>
  );
};

export default TopResult;
