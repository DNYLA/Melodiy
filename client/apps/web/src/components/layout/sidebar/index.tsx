import React from 'react';
import SidebarNav from './SidebarHeader';

interface SidebarProps {
  children: React.ReactNode;
}

export function Sidebar({ children }: SidebarProps) {
  return (
    <div className="sidebar">
      <SidebarNav />

      {/* <ScrollContext.Provider
        value={{ scrollX, scrollY, scrollXProgress, scrollYProgress }}
      > */}
      <main className="page--container">
        {/* <Navbar /> */}
        <div>{children}</div>
      </main>
      {/* </ScrollContext.Provider> */}
    </div>
  );
}
