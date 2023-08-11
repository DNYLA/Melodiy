import Link from 'next/link';
import React from 'react';
import { IconType } from 'react-icons';
import { twMerge } from 'tailwind-merge';

interface SidebarItemProps {
  icon: IconType;
  label: string;
  active?: boolean;
  href: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon: Icon,
  label,
  active,
  href,
}) => {
  return (
    <Link
      href={href}
      className={twMerge(
        `
				px-2
				py-1
        flex
        flex-row
        h-auto
        items-center
        w-full
        gap-x-2
        text-sm
        font-medium
        cursor-pointer
        hover:text-white
        transition
        text-neutral-400
				`,
        active && 'text-white bg-[#131111] border border-[#272525]  rounded-md'
      )}
    >
      <Icon size={22} />
      <p className="w-full truncate">{label}</p>
    </Link>
  );
};

export default SidebarItem;
