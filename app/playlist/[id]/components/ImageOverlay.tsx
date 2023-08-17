'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import { twMerge } from 'tailwind-merge';

interface Props {
  src: string;
}

export default function ImageOverlay({ src }: Props) {
  const [filter, setFilter] = useState(randomImageFilter());

  const changeFilter = () => {
    setFilter(randomImageFilter(filter));
  };

  return (
    <Image
      draggable={false}
      className={twMerge(
        'rounded-md group-hover:saturate-150 group-hover:brightness-[0.85] z-5',
        filter
      )}
      onClick={changeFilter}
      src={src}
      width={300}
      height={300}
      alt="Playlist Cover"
    />
  );
}

function randomImageFilter(ignore: string) {
  let filters = [
    'group-hover:sepia',
    'group-hover:brightness-[0.35]',
    'group-hover:contrast-125 group-hover:brightness-[0.55]',
    'group-hover:grayscale group-hover:brightness-[0.85]',
    'group-hover:hue-rotate-[25deg] group-hover:brightness-[0.85]',
  ];
  filters = filters.filter((curFilter) => ignore !== curFilter);

  const filter = filters[Math.floor(Math.random() * filters.length)];
  return filter;
}
