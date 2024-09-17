import { twMerge } from 'tailwind-merge';
import SidebarHeader from './SidebarHeader';
import { useRef } from 'react';
import { useScroll } from 'framer-motion';
import { ScrollContext } from '../../../providers/ScrollProvider';
import { Navbar } from '../Navbar/';
import { Player } from '../../Player';
import { usePlayer } from '../../Player/hooks/usePlayer';

interface SidebarProps {
  children: React.ReactNode;
}

function Sidebar({ children }: SidebarProps) {
  const player = usePlayer();
  const pageRef = useRef(null);
  const { scrollX, scrollY, scrollXProgress, scrollYProgress } = useScroll({
    container: pageRef,
  });

  return (
    <div className={twMerge(`flex h-screen w-full`)}>
      <SidebarHeader />

      <ScrollContext.Provider
        value={{ scrollX, scrollY, scrollXProgress, scrollYProgress }}
      >
        <main
          className="flex-1 w-full h-full pb-2 overflow-y-auto"
          ref={pageRef}
        >
          <Navbar />
          <div
            className={twMerge(
              'w-full rounded-lg border-[#202020] border ml-2 gap-y-5',
              player.active && 'mb-14',
            )}
          >
            {children}
          </div>
          <div className="p-2">
            <Player />
          </div>
        </main>
      </ScrollContext.Provider>
    </div>
  );
}

export { Sidebar };
