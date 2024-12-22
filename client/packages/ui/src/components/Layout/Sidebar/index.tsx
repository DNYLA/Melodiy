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
    <div className={twMerge(`flex h-full w-full`)}>
      <SidebarHeader />

      <div className="flex flex-col w-full h-[calc(100vh-16px)]">
        <ScrollContext.Provider
          value={{ scrollX, scrollY, scrollXProgress, scrollYProgress }}
        >
          <main className="flex-1 pb-2 overflow-y-auto" ref={pageRef}>
            <Navbar />

            <div
              className={twMerge(
                'rounded-lg border-[#202020] border h-[calc(100vh-100px)] ml-2 gap-y-5 overflow-auto',
                player.active && 'h-[calc(100vh-175px)]'
              )}
            >
              {children}
            </div>

            <Player />
          </main>
        </ScrollContext.Provider>
      </div>
    </div>
  );
}

export { Sidebar };
