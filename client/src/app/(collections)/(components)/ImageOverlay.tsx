'use client';
import { getDefaultImage } from '@/lib/utils';
import { ScrollContext } from '@/providers/ScrollProvider';
import { motion, useTransform } from 'framer-motion';
import { FC, SyntheticEvent, useContext, useEffect, useState } from 'react';
import { FiEdit2 } from 'react-icons/fi';
import { twMerge } from 'tailwind-merge';

export interface ImageOverlayProps {
  src: string;
}

const ImageOverlay: FC<ImageOverlayProps> = ({ src }) => {
  const [filter, setFilter] = useState('');
  const { scrollY } = useContext(ScrollContext);
  const imageScale = useTransform(scrollY!, [50, 375], ['300px', '150px']);

  useEffect(() => {
    setFilter(randomImageFilter());
  }, [setFilter]);

  const changeFilter = () => {
    setFilter(randomImageFilter(filter));
  };

  const handleError = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    console.log(e);
    e.currentTarget.src = getDefaultImage();
  };

  useEffect(() => {
    console.log(scrollY?.get());
  }, [scrollY]);

  return (
    <motion.div
      style={{ height: imageScale }}
      className="group relative cursor-pointer"
    >
      <div className="absolute left-1/2 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 transform cursor-pointer flex-col place-items-center text-white group-hover:flex ">
        <FiEdit2
          size={30}
          className="center flex snap-center place-items-center content-center justify-center object-center align-middle"
        />
        <span className="text-md">Select Photo</span>
      </div>
      <div className="">
        <motion.img
          src={src ?? getDefaultImage()}
          onError={handleError}
          onClick={changeFilter}
          draggable={false}
          className={twMerge('z-5 rounded-md', filter)}
          // priority={true}
          // width={300}
          // height={300}
          // width={imageScale.get()}
          // height={imageScale.get()}
          style={{
            objectFit: 'cover',
            // objectFit: 'contain',
            height: imageScale,
            width: imageScale,
          }}
          alt={'Collection cover'}
        />
      </div>
    </motion.div>
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
