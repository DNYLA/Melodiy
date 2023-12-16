'use client';
import ControlPanel from '@/app/artist/[id]/components/ControlPanel';
import { getDefaultImage } from '@/lib/utils';
import { ScrollContext } from '@/providers/ScrollProvider';
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useTransform,
} from 'framer-motion';
import Image from 'next/image';
import { FC, useContext, useState } from 'react';
import { BiShuffle } from 'react-icons/bi';
import { BsFillPlayFill } from 'react-icons/bs';

export interface ArtistHeaderProps {
  id: string;
  name: string;
  imageUrl?: string;
  listerners: number;
}

export const ArtistHeader: FC<ArtistHeaderProps> = ({
  name,
  imageUrl,
  listerners,
}) => {
  const imgUrl = imageUrl ?? getDefaultImage();
  const { scrollY } = useContext(ScrollContext);

  const size = useTransform(scrollY!, [50, 500], ['500px', '200px']);
  const isFullVisibleMotion = useTransform(scrollY!, (value) => value < 300);

  const [isFullVisible, setIsFullVisible] = useState(true);

  useMotionValueEvent(scrollY!, 'change', () => {
    setIsFullVisible(isFullVisibleMotion.get());
  });

  return (
    <motion.div
      style={{
        backgroundColor: '#2b2525',
        position: 'sticky',
        top: 0,
        scaleY: size,
        height: size,
        zIndex: 60,
      }}
    >
      <div className="">
        <Image
          src={imgUrl}
          fill={true}
          // style={{ objectFit: isFullVisible ? 'cover' : 'contain' }}
          style={{
            objectFit: 'cover',
            filter: isFullVisible ? 'blur(4px)' : 'blur(6px)',
          }}
          alt="Artist Cover"
          quality={100}
          draggable={false}
        />
        <div className="absolute bottom-0 flex w-full items-center justify-between px-5 py-2">
          <div className="flex ">
            <div className="">
              <h1 className="text-3xl font-bold">{name}</h1>
              <span className="hidden text-base font-medium md:block">
                {listerners.toLocaleString()} Monthly Listerners
              </span>
            </div>
            <AnimatePresence mode="popLayout">
              <div className="mx-10  flex items-center gap-x-4 align-middle ">
                <button className="group flex items-center gap-x-1 rounded bg-white px-4 py-2 text-center font-bold text-black hover:bg-opacity-80 disabled:cursor-not-allowed disabled:opacity-50">
                  <BsFillPlayFill size={25} className="" />
                  Play
                </button>

                <button className="group flex items-center gap-x-1 rounded bg-white px-4 py-2 text-center font-bold text-black hover:bg-opacity-80 disabled:cursor-not-allowed disabled:opacity-50">
                  <BiShuffle size={25} className="" />
                  Shuffle
                </button>
              </div>
            </AnimatePresence>
          </div>

          <div className="flex h-full gap-x-8 pr-48">
            <ControlPanel isPlayVisible={false} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};
