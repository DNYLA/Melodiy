'use client';
import { usePathname } from 'next/navigation';
import React, { useMemo } from 'react';
import { AiOutlineCompass, AiOutlineHome } from 'react-icons/ai';
import { BiArrowBack } from 'react-icons/bi';
import { MdOutlineAudioFile, MdOutlineFavorite } from 'react-icons/md';
import { twMerge } from 'tailwind-merge';

import PlaylistBody from '@/components/Sidebar/playlist-body';
import usePlayer from '@/hooks/stores/usePlayer';
import Navbar from '../Navbar';
import PlaylistHeader from './playlists';
import SidebarItem from './sidebar-item';

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
      {
        icon: AiOutlineCompass,
        label: 'Discover',
        active: pathname === '/discover',
        href: '/discover',
      },
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

  return (
    <div
      className={twMerge(
        `flex h-full`,
        player.activeId && 'h-[calc(100%-80px)]'
      )}
    >
      <div className="hidden h-full w-[250px] select-none flex-col gap-y-2 bg-sidebar-background px-4 py-2 md:flex">
        {/* <div className="hidden md:flex flex-col gap-y-2 bg-black h-full w-[300px] p-2"> */}

        <div className="relative flex flex-row items-center justify-center">
          <p className="">Melodiy</p>
          <div className="absolute right-0 top-0 cursor-pointer py-[3px] hover:text-inactive">
            <BiArrowBack size={16} />
          </div>
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
      </div>

      <main className="h-full flex-1 overflow-y-auto px-4 py-2 pr-5">
        <Navbar />
        {children}
      </main>
    </div>
  );
};

export default Sidebar;
