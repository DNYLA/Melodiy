import React, { useRef } from 'react';
import SidebarHeader from './SidebarHeader';
import { twMerge } from 'tailwind-merge';
import { Navbar } from '../Navbar';
import { usePlayer } from '../../Player/hooks/usePlayer';
import { useScroll } from 'framer-motion';
import { ScrollContext } from '../../../providers/ScrollProvider';

interface SidebarProps {
  children: React.ReactNode;
}

export function Sidebar({ children }: SidebarProps) {
  const player = usePlayer();
  const pageRef = useRef(null);
  const { scrollX, scrollY, scrollXProgress, scrollYProgress } = useScroll({
    container: pageRef,
  });

  return (
    <div
      className={twMerge(
        `flex h-full w-full`,
        player.active && 'h-[calc(100%-80px)]'
      )}
    >
      <SidebarHeader />

      <ScrollContext.Provider
        value={{ scrollX, scrollY, scrollXProgress, scrollYProgress }}
      >
        <main
          className="h-full w-full flex-1 overflow-y-auto pb-2"
          ref={pageRef}
        >
          <Navbar />
          <div className="w-full">{children}</div>
        </main>
      </ScrollContext.Provider>
    </div>
  );
}
