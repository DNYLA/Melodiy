import { twMerge } from 'tailwind-merge';
import SidebarHeader from './SidebarHeader';
import { useRef } from 'react';
import { useScroll } from 'framer-motion';
import { ScrollContext } from '../../../providers/ScrollProvider';
import { Navbar } from '../Navbar/';

interface SidebarProps {
  children: React.ReactNode;
}

function Sidebar({ children }: SidebarProps) {
  // const player = usePlayer();
  const pageRef = useRef(null);
  const { scrollX, scrollY, scrollXProgress, scrollYProgress } = useScroll({
    container: pageRef,
  });

  return (
    <div
      className={twMerge(
        `flex h-full w-full`,
        // player.active && 'h-[calc(100%-80px)]',
      )}
    >
      <SidebarHeader />

      <ScrollContext.Provider
        value={{ scrollX, scrollY, scrollXProgress, scrollYProgress }}
      >
        <main
          className="flex-1 w-full h-full pb-2 overflow-y-auto"
          ref={pageRef}
        >
          <Navbar />
          <div className="w-full">{children}</div>
        </main>
      </ScrollContext.Provider>
    </div>
  );
}

export { Sidebar };
