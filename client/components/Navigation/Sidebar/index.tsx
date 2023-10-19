'use client';
import { usePathname } from 'next/navigation';
import React, { useEffect, useMemo, useRef } from 'react';
import { AiOutlineHome } from 'react-icons/ai';
import { MdOutlineAudioFile, MdOutlineFavorite } from 'react-icons/md';
import { twMerge } from 'tailwind-merge';

import PlaylistBody from '@/components/Navigation/Sidebar/PlaylistBody';
import usePlayer from '@/hooks/stores/usePlayer';
import Navbar from '../Navbar';
import PlaylistHeader from './PlaylistTitle';
import SidebarItem from './SidebarNavItem';

interface SidebarProps {
  children: React.ReactNode;
}
const Sidebar = ({ children }: SidebarProps) => {
  const player = usePlayer();
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

  useEffect(() => {
    if (resizeDragger.current) {
      resizeDragger.current.addEventListener('mousedown', () => {
        document.addEventListener('mousemove', resize, false);
        document.addEventListener(
          'mouseup',
          () => {
            document.removeEventListener('mousemove', resize, false);
          },
          false
        );
      });
    }
  }, []);

  const resize = (e: MouseEvent) => {
    sidebar.current!.style.width = `${e.x}px`;
  };

  return (
    <div
      className={twMerge(
        `flex h-full`,
        player.activeId && 'h-[calc(100%-80px)]'
      )}
    >
      <div
        ref={sidebar}
        className="relative h-full w-[250px] max-w-[400px] select-none flex-col gap-y-2 bg-sidebar-background px-4 py-2 md:flex"
      >
        {/* <div className="hidden md:flex flex-col gap-y-2 bg-black h-full w-[300px] p-2"> */}

        <div className="relative flex flex-row items-center justify-center">
          <p className="">Melodiy</p>
        </div>

        <div className="flex flex-col gap-y-1 py-4">
          <p className="text-lg font-semibold">Browse</p>
          <div className="mx-2">
            {routes.map((item) => (
              <SidebarItem key={item.label} {...item} />
            ))}
          </div>
        </div>

        <PlaylistHeader>
          {/* Nested as <PlaylistBody> will become a server component. */}
          <PlaylistBody />
        </PlaylistHeader>

        {/* Resize dragger */}
        <div
          ref={resizeDragger}
          className="bg-green absolute right-[-5px] top-0 h-full w-[20px] cursor-col-resize"
        ></div>
      </div>

      <main className="h-full flex-1 overflow-y-auto px-4 py-2 pr-5">
        <Navbar />
        <div className="pr-5">{children}</div>
      </main>
    </div>
  );
};

export default Sidebar;
