'use client';
import Image from '@/components/Data/Image';
import { FC, useEffect, useState } from 'react';
import { FiEdit2 } from 'react-icons/fi';
import { twMerge } from 'tailwind-merge';

export interface ImageOverlayProps {
  src: string;
}

const ImageOverlay: FC<ImageOverlayProps> = ({ src }) => {
  const [filter, setFilter] = useState('');

  useEffect(() => {
    setFilter(randomImageFilter());
  }, [setFilter]);

  const changeFilter = () => {
    setFilter(randomImageFilter(filter));
  };
  return (
    <div className="group relative cursor-pointer">
      <div className="absolute left-1/2 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 transform cursor-pointer flex-col place-items-center text-white group-hover:flex ">
        <FiEdit2
          size={30}
          className="center flex snap-center place-items-center content-center justify-center object-center align-middle"
        />
        <span className="text-md">Select Photo</span>
      </div>
      <Image
        src={src ?? 'images/default_playlist.png'}
        onClick={changeFilter}
        draggable={false}
        className={twMerge('z-5 h-[300px] w-[300px] rounded-md', filter)}
        priority={true}
        width={300}
        height={300}
        alt={'Collection cover'}
      />
    </div>
  );
};

export default ImageOverlay;

function randomImageFilter(ignore?: string) {
  let filters = [
    'group-hover:sepia',
    'group-hover:brightness-[0.35]',
    'group-hover:contrast-125 group-hover:brightness-[0.55]',
    'group-hover:grayscale group-hover:brightness-[0.85]',
    'group-hover:hue-rotate-[25deg] group-hover:brightness-[0.85]',
    'group-hover:saturate-150 group-hover:brightness-[0.85]',
  ];
  filters = filters.filter((curFilter) => ignore !== curFilter);

  const filter = filters[Math.floor(Math.random() * filters.length)];
  return filter;
}
