import { ScrollContext } from '@melodiy/shared-ui';
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useTransform,
} from 'framer-motion';
import { useContext, useState } from 'react';
import { BiShuffle } from 'react-icons/bi';
import { BsFillPlayFill } from 'react-icons/bs';
import ControlPanel from './ControlPanel';

export interface ArtistHeaderProps {
  id: string;
  name: string | React.ReactNode;
  imageSrc?: string;
  listerners?: number;
}

function ArtistHeader({ name, imageSrc, listerners }: ArtistHeaderProps) {
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
        {imageSrc && (
          <img
            src={imageSrc}
            style={{
              objectFit: 'cover',
              filter: isFullVisible ? 'blur(4px)' : 'blur(6px)',
              position: 'absolute',
              height: '100%',
              width: '100%',
              inset: '0px',
              color: 'transparent',
            }}
            draggable={false}
            alt={'Artist Cover'}
          />
        )}
        <div className="absolute bottom-0 flex items-center justify-between w-full px-5 py-2">
          <div className="flex ">
            <div className="">
              <h1 className="text-3xl font-bold">{name}</h1>
              {listerners != null && (
                <span className="hidden text-base font-medium md:block">
                  {listerners.toLocaleString()} Monthly Listerners
                </span>
              )}
            </div>
            <AnimatePresence mode="popLayout">
              <div className="flex items-center mx-10 align-middle gap-x-4 ">
                <button className="flex items-center px-4 py-2 font-bold text-center text-black bg-white rounded group gap-x-1 hover:bg-opacity-80 disabled:cursor-not-allowed disabled:opacity-50">
                  <BsFillPlayFill size={25} className="" />
                  Play
                </button>

                <button className="flex items-center px-4 py-2 font-bold text-center text-black bg-white rounded group gap-x-1 hover:bg-opacity-80 disabled:cursor-not-allowed disabled:opacity-50">
                  <BiShuffle size={25} className="" />
                  Shuffle
                </button>
              </div>
            </AnimatePresence>
          </div>

          <div className="flex h-full pr-48 gap-x-8">
            <ControlPanel isPlayVisible={false} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export { ArtistHeader };
