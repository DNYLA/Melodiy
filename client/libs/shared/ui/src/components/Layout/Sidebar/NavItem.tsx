import { Link } from '@tanstack/react-router';
import { IconType } from 'react-icons';

interface ISidebarNavItem {
  icon: IconType;
  label: string;
  href: string;
}

const NavItem: React.FC<ISidebarNavItem> = ({ icon: Icon, label, href }) => {
  return (
    <Link
      draggable={false}
      to={href}
      className={`[&.active]:rounded-md  [&.active]:border  [&.active]:bg-[#131111] [&.active]:text-white flex h-auto w-full cursor-pointer flex-row items-center gap-x-2 border-[#272525] px-2 py-1 text-sm font-medium text-inactive transition hover:text-white`}
    >
      <Icon size={22} />
      <p className="w-full truncate">{label}</p>
    </Link>
  );
};

export default NavItem;
