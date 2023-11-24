'use client';
import { usePathname } from 'next/navigation';
import React, { useMemo, useRef } from 'react';
import { AiOutlineHome } from 'react-icons/ai';
import { MdOutlineAudioFile, MdOutlineFavorite } from 'react-icons/md';
import { twMerge } from 'tailwind-merge';

// import PlaylistBody from '@/components/Navigation/Sidebar/PlaylistBody';
// import usePlayer from '@/hooks/stores/usePlayer';
// import Navbar from '../Navbar';
// import PlaylistHeader from './PlaylistTitle';
// import SidebarItem from './SidebarNavItem';
import useResize from '@/hooks/useResize';
import { ScrollContext } from '@/providers/ScrollProvider';
import { useScroll } from 'framer-motion';
import Navbar from '../Navbar';
import Library from './Data/Library';
import NavItem from './NavItem';

interface SidebarProps {
  children: React.ReactNode;
}
const Sidebar = ({ children }: SidebarProps) => {
  const pageRef = useRef(null);
  const { scrollX, scrollY, scrollXProgress, scrollYProgress } = useScroll({
    container: pageRef,
  });

  // useMotionValueEvent(scrollY, 'change', (latest) => {
  //   console.log('Page scroll: ', latest);
  // });

  // useMotionValueEvent(scrollYProgress, 'change', (latest) => {
  //   console.log('Page scroll Progress: ', latest);
  // });

  const pathname = usePathname();
  const routes = useMemo(
    () => [
      {
        icon: AiOutlineHome,
        label: 'Home',
        active: pathname === '/',
        href: '/',
      },
      // {
      //   icon: AiOutlineCompass,
      //   label: 'Discover',
      //   active: pathname === '/discover',
      //   href: '/discover',
      // },
      {
        icon: MdOutlineFavorite,
        label: 'Favourites',
        active: pathname === '/liked',
        href: '/liked',
      },
      {
        icon: MdOutlineAudioFile,
        label: 'Your Files',
        active: pathname === '/files',
        href: '/files	',
      },
    ],
    [pathname]
  );
  const sidebar = useRef<HTMLDivElement>(null);
  const resizeDragger = useRef<HTMLDivElement>(null);
  useResize(sidebar, resizeDragger, 'sidebar-width');

  return (
    <div
      className={twMerge(
        `flex h-full`
        // player.activeId && 'h-[calc(100%-80px)]'
      )}
    >
      <div
        ref={sidebar}
        className="relative h-full w-[250px] min-w-[100px] max-w-[400px] select-none flex-col gap-y-2 bg-sidebar-background px-4 py-2 md:flex"
      >
        <div className="relative flex flex-row items-center justify-center">
          <p className="">Melodiy</p>
        </div>

        <div className="flex flex-col gap-y-1 py-4">
          <p className="truncate text-lg font-semibold">Browse</p>
          <div className="mx-2">
            {routes.map((item) => (
              <NavItem key={item.label} {...item} />
            ))}
          </div>
        </div>

        <Library />

        {/* Resize dragger */}
        <div
          ref={resizeDragger}
          id="sidebar-dragger"
          className="bg-green absolute right-[-8px] top-0 h-full w-[20px] cursor-col-resize"
        ></div>
      </div>

      <ScrollContext.Provider
        value={{ scrollX, scrollY, scrollXProgress, scrollYProgress }}
      >
        <main className="h-full flex-1 overflow-y-auto pb-2" ref={pageRef}>
          <Navbar />

          <div className="w-full">{children}</div>
          {/* </ScrollContext.Provider> */}
        </main>
      </ScrollContext.Provider>
    </div>
  );
};

export default Sidebar;
