'use client';

import ImageOverlay from '@/app/(collections)/(components)/ImageOverlay';
import { collectionTypeToString, getDefaultImage } from '@/lib/utils';
import { ScrollContext } from '@/providers/ScrollProvider';
import { Track } from '@/types';
import { CollectionType } from '@/types/collections';
import dayjs from 'dayjs';
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useTransform,
} from 'framer-motion';
import { FC, useContext, useEffect, useRef, useState } from 'react';
import { BiShuffle } from 'react-icons/bi';
import { BsFillPlayFill } from 'react-icons/bs';

export interface CollectionHeaderProps {
  title: string;
  type: CollectionType;
  cover?: string;
  releaseDate: Date;
  tracks: Track[];
  owner: { name: string; redirect: string };
}

const CollectionHeader: FC<CollectionHeaderProps> = ({
  title,
  type,
  cover,
  releaseDate,
  tracks,
  owner,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  // const { scrollY, scrollYProgress } = useScroll({
  //   target: ref,
  //   offset: ['0 1', '1.33 1'],
  // });
  const { scrollY, scrollYProgress } = useContext(ScrollContext);

  const size = useTransform(scrollY!, [50, 375], ['400px', '235px']);
  const isVisibleMotion = useTransform(scrollY!, (value) => value < 175);
  const isFullVisibleMotion = useTransform(scrollY!, (value) => value < 175);
  const isPreviewVisibleMotion = useTransform(scrollY!, (value) => value > 225);
  const [isFullVisible, setIsFullVisible] = useState(true);
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);

  useMotionValueEvent(scrollY!, 'change', (latest) => {
    setIsFullVisible(isFullVisibleMotion.get());
    setIsPreviewVisible(isPreviewVisibleMotion.get());
  });

  // useMotionValueEvent(scrollY, 'change', (latest) => {
  //   console.log('Page scroll Pixels: ', latest);
  // });

  useEffect(() => {
    isPreviewVisibleMotion.set(false);
  });

  const calculateDuration = () => {
    if (!tracks || tracks.length === 0) return '0 MINUTES';
    const totalDuration = tracks.reduce(
      (total, { duration }) => total + duration,
      0
    );
    const totalMins = totalDuration / 60000;

    return `${Math.round(totalMins)} MINUTES`;
  };

  const getCollectionDetails = () => {
    const trackAmount = tracks?.length ?? 0;
    const duration = calculateDuration();
    const date = dayjs(releaseDate ?? new Date());

    return `${trackAmount} SONGS • ${duration} • ${date.year()}`;
  };

  console.log(cover);

  return (
    <motion.div
      style={{
        backgroundColor: '#2b2525',
        position: 'sticky',
        top: 0,
        scaleY: size,
        height: size,
      }}
      className="flex gap-x-4 bg-red-500 p-2 px-5 pt-[4.5rem]"
      ref={ref}
    >
      <ImageOverlay src={cover ?? getDefaultImage()} />
      <AnimatePresence mode="popLayout">
        {isFullVisible && (
          <motion.div
            key="content"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1, transition: { delay: 0 } }} // Add delay here
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
          >
            <div>
              <p className="text-inactive">{collectionTypeToString(type)}</p>
              <p className="text-xl font-bold md:text-2xl lg:text-3xl">
                {title}
              </p>
              <p className="cursor-pointer text-inactive hover:underline">
                {owner.name}
              </p>
              <p className="font-light">{getCollectionDetails()}</p>
            </div>

            <div className="mt-8 flex gap-x-6">
              <button className="group flex items-center gap-x-1 rounded bg-white px-4 py-2 text-center font-bold text-black hover:bg-opacity-80 disabled:cursor-not-allowed disabled:opacity-50">
                <BsFillPlayFill size={25} className="" />
                Play
              </button>
              <button className="group flex items-center gap-x-1 rounded bg-white px-4 py-2 text-center font-bold text-black hover:bg-opacity-80 disabled:cursor-not-allowed disabled:opacity-50">
                <BiShuffle size={25} className="" />
                Shuffle
              </button>
            </div>
          </motion.div>
        )}

        {isPreviewVisible && (
          <motion.div
            key="alternative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="my-auto flex flex-col gap-y-4 text-5xl font-bold"
          >
            {title}
            <div className="flex gap-x-6 text-base">
              <button className="group flex items-center gap-x-1 rounded bg-white px-4 py-2 text-center font-bold text-black hover:bg-opacity-80 disabled:cursor-not-allowed disabled:opacity-50">
                <BsFillPlayFill size={25} className="" />
                Play
              </button>
              <button className="group flex items-center gap-x-1 rounded bg-white px-4 py-2 text-center font-bold text-black hover:bg-opacity-80 disabled:cursor-not-allowed disabled:opacity-50">
                <BiShuffle size={25} className="" />
                Shuffle
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default CollectionHeader;
