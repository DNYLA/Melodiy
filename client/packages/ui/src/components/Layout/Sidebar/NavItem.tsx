import { Link } from '@tanstack/react-router';
import { IconType } from 'react-icons';
import { Icon, Icons } from '../../Utils';

interface NavItemProps {
  icon: Icons;
  label: string;
  href: string;
}

function NavItem({ icon, label, href }: NavItemProps) {
  return (
    <Link
      draggable={false}
      to={href}
      className="flex items-center self-stretch justify-between gap-2.5 text-sm text-base-accent group hover:text-content"
    >
      <Icon
        icon={icon}
        width={55}
        height={55}
        className="group-hover:fill-content fill-red-500 stroke-red-500"
      />
      <span className="w-full truncate">{label}</span>
    </Link>
  );
}

export default NavItem;
