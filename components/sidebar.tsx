'use client';
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { twMerge } from 'tailwind-merge';
import Box from './box';
import { usePathname } from 'next/navigation';
import { AiOutlineHome, AiOutlineCompass } from 'react-icons/ai';
import { MdOutlineAudioFile, MdOutlineFavorite } from 'react-icons/md';
import { BiArrowBack } from 'react-icons/bi';

import SidebarItem from '@/components/sidebar-item';

interface SidebarProps {
  children: React.ReactNode;
}
const Sidebar = ({ children }: SidebarProps) => {
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

  const tempPlaylists = [
    { name: 'Please Excuse Me for Being Antisocial', active: false },
    { name: "90's rap", active: false },
    { name: 'Rippity Rap', active: false },
    { name: 'Feed tha streets II', active: true },
    { name: 'West Bay', active: false },
    { name: 'Man On The Moon III: The Chosen', active: false },
  ];
  return (
    <div
      className={twMerge(
        `flex h-full`
        // player.activeId && 'h-[calc(100%-80px)]'
      )}
    >
      <div className="hidden md:flex flex-col gap-y-2 h-full w-[250px] px-4 py-2 bg-neutral-900">
        <div className="flex flex-col font-bold text-center gap-y-4">
          <div className="relative flex flex-row items-center justify-center">
            <p className="">Melodiy</p>
            <div className="cursor-pointer hover:text-neutral-400 absolute top-0 right-0 py-[3px]">
              <BiArrowBack size={16} />
            </div>
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

        <div className="flex flex-col py-0 gap-y-1">
          <p className="text-lg font-semibold">Playlists</p>
          <div className="flex flex-col mx-2 overflow-hidden text-sm font-light gap-y-1 text-[#a3a3a3]">
            {tempPlaylists.map((playlist) => (
              <p
                key={playlist.name}
                className={`cursor-pointer truncate ... hover:text-white ${
                  playlist.active ? 'text-white' : ''
                }`}
              >
                {playlist.name}
              </p>
            ))}
          </div>
        </div>
      </div>
      <main className="flex-1 h-full py-2 overflow-y-auto">{children}</main>
    </div>
  );
};

export default Sidebar;
