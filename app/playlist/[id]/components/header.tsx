import ImageOverlay from '@/app/playlist/[id]/components/image-overlay';
import { Playlist } from '@/types/playlist';
import { getImageUrl } from '@/utils';
import Image from 'next/image';
import React, { useState } from 'react';
import { BsFillPlayFill } from 'react-icons/bs';
import { FiEdit2 } from 'react-icons/fi';
import { twMerge } from 'tailwind-merge';
interface Props {
  data: Playlist;
}

export default function PlaylistHeader({ data }: Props) {
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
          src={
            data.imagePath
              ? getImageUrl(data.imagePath)
              : '/images/antisocial.jpg'
          }
        />
      </div>
      <div>
        <div>
          <p className="text-inactive">Private Playlist</p>
          <p className="text-xl md:text-2xl lg:text-3xl font-bold">
            {data.title}
          </p>
          <p className="text-inactive cursor-pointer hover:underline">
            {data.user.username}
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
