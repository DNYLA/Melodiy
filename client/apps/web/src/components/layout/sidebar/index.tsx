import React from 'react';
import SidebarNav from './SidebarHeader';

interface SidebarProps {
  children: React.ReactNode;
}

export function Sidebar({ children }: SidebarProps) {
  return (
    <div className="flex h-full w-full">
      <SidebarNav />

      {/* <ScrollContext.Provider
        value={{ scrollX, scrollY, scrollXProgress, scrollYProgress }}
      > */}
      <main className="h-full w-full flex-1 overflow-y-auto pb-2">
        {/* <Navbar /> */}
        <div className="w-full">{children}</div>
      </main>
      {/* </ScrollContext.Provider> */}
    </div>
  );
}
