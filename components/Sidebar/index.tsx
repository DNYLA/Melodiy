'use client';
import React, { useMemo } from 'react';
import { twMerge } from 'tailwind-merge';
import { usePathname } from 'next/navigation';
import { AiOutlineHome, AiOutlineCompass } from 'react-icons/ai';
import { MdOutlineAudioFile, MdOutlineFavorite } from 'react-icons/md';
import { BiArrowBack } from 'react-icons/bi';

import SidebarItem from './sidebar-item';
import PlaylistHeader from './playlists';
import Navbar from '../Navbar';
import Playlist from '@/app/playlist/[id]/page';
import PlaylistBody from '@/components/Sidebar/playlist-body';
import { useSession } from 'next-auth/react';
import usePlayer from '@/hooks/stores/usePlayer';

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
      <div className="hidden md:flex flex-col gap-y-2 h-full w-[250px] px-4 py-2 bg-sidebar-background select-none">
        {/* <div className="hidden md:flex flex-col gap-y-2 bg-black h-full w-[300px] p-2"> */}

        <div className="relative flex flex-row items-center justify-center">
          <p className="">Melodiy</p>
          <div className="cursor-pointer hover:text-inactive absolute top-0 right-0 py-[3px]">
            <BiArrowBack size={16} />
          </div>
        </div>

        <div className="flex flex-col py-4 gap-y-1">
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

      <main className="flex-1 h-full px-4 py-2 pr-5 overflow-y-auto">
        <Navbar />
        {children}
      </main>
    </div>
  );
};

export default Sidebar;
