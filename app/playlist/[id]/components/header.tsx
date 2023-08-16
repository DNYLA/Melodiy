import { Playlist } from '@/types/playlist';
import Image from 'next/image';
import React from 'react';
import { BsFillPlayFill } from 'react-icons/bs';

interface Props {
  data: Playlist;
}

export default function PlaylistHeader({ data }: Props) {
  return (
    <div className="flex gap-x-4">
      <div>
        <Image
          className="rounded-md"
          src={'/images/antisocial.jpg'}
          width={300}
          height={300}
          alt="Album Cover"
        />
      </div>
      <div className="">
        <div>
          <p className="text-inactive">Album</p>
          <p className="text-xl md:text-2xl lg:text-3xl font-bold">
            {data.title}
          </p>
          <p className="text-inactive cursor-pointer hover:underline">
            Roddy Ricch
          </p>
          <p className="font-light">16 SONGS • 43 MINUTES • 2019</p>
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
