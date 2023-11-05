'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

interface Props {
  src: string;
}

export default function ImageOverlay({ src }: Props) {
  const [filter, setFilter] = useState('');

  useEffect(() => {
    setFilter(randomImageFilter());
  }, [setFilter]);

  const changeFilter = () => {
    setFilter(randomImageFilter(filter));
  };

  return (
    <Image
      draggable={false}
      className={twMerge('z-5 h-[300px] w-[300px] rounded-md', filter)}
      priority={true}
      // onMouseLeave={() => setFilter(randomImageFilter())} //Looks good but looks weird if u spam or enter/exit quickly
      onClick={changeFilter}
      src={src}
      width={300}
      height={300}
      alt="Playlist Cover"
      quality={100}
    />
  );
}

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
