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
import './index.css';

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
      const savedSize = localStorage.getItem('sidebar-width');
      if (savedSize) {
        // Sort of a hack, if we are restoring sidebar width from a saved width,
        // we want a smooth transition, but we don't want it if user is manually
        // resizing, so we remove it after.
        sidebar.current!.classList.add('transition-all');
        resize(Number(savedSize));
        setTimeout(() => {
          sidebar.current!.classList.remove('transition-all');
        }, 200);
      }
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

  const resize = (xx: number | MouseEvent) => {
    const x = typeof xx == 'number' ? xx : xx.x;
    localStorage.setItem('sidebar-width', String(x));
    if (x < 50) {
      sidebar.current!.style.width = `0px`;
      sidebar.current!.classList.add('collapsed-sidebar');
      return;
    }
    sidebar.current!.classList.remove('collapsed-sidebar');
    sidebar.current!.style.width = `${x}px`;
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
        className="relative h-full w-[250px] min-w-[100px] max-w-[400px] select-none flex-col gap-y-2 bg-sidebar-background px-4 py-2 md:flex"
      >
        {/* <div className="hidden md:flex flex-col gap-y-2 bg-black h-full w-[300px] p-2"> */}

        <div className="relative flex flex-row items-center justify-center">
          <p className="">Melodiy</p>
        </div>

        <div className="flex flex-col gap-y-1 py-4">
          <p className="truncate text-lg font-semibold">Browse</p>
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
          id="sidebar-dragger"
          className="bg-green absolute right-[-8px] top-0 h-full w-[20px] cursor-col-resize"
        ></div>
      </div>

      <main className="h-full flex-1 overflow-y-auto pb-2">
        <Navbar />
        <div className="w-full">{children}</div>
      </main>
    </div>
  );
};

export default Sidebar;
