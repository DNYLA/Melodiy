import React from 'react';
import SidebarNav from './SidebarHeader';
import { twMerge } from 'tailwind-merge';
import { Navbar } from '../Navbar';

interface SidebarProps {
  children: React.ReactNode;
}

export function Sidebar({ children }: SidebarProps) {
  const player = {
    active: false,
  };

  return (
    <div
      className={twMerge(
        `flex h-full w-full`,
        player.active && 'h-[calc(100%-80px)]'
      )}
    >
      <SidebarNav />

      {/* <ScrollContext.Provider
        value={{ scrollX, scrollY, scrollXProgress, scrollYProgress }}
      > */}
      <main className="h-full w-full flex-1 overflow-y-auto pb-2">
        <Navbar />
        <div className="w-full">{children}</div>
      </main>
      {/* </ScrollContext.Provider> */}
    </div>
  );
}
