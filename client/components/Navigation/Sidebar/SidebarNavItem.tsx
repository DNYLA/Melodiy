import Link from 'next/link';
import { IconType } from 'react-icons';
import { twMerge } from 'tailwind-merge';

interface ISidebarNavItem {
  icon: IconType;
  label: string;
  active?: boolean;
  href: string;
}

const SidebarNavItem: React.FC<ISidebarNavItem> = ({
  icon: Icon,
  label,
  active,
  href,
}) => {
  return (
    <Link
      draggable={false}
      href={href}
      className={twMerge(
        `
				flex
				h-auto
        w-full
        cursor-pointer
        flex-row
        items-center
        gap-x-2
        border-[#272525]
        px-2
        py-1
        text-sm
        font-medium
        text-inactive
        transition
				hover:text-white
				`,
        active && 'rounded-md border bg-[#131111] text-white'
      )}
    >
      <Icon size={22} />
      <p className="w-full truncate">{label}</p>
    </Link>
  );
};

export default SidebarNavItem;
