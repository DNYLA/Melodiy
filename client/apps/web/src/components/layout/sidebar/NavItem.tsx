import { Link } from '@tanstack/react-router';
import { IconType } from 'react-icons';

interface ISidebarNavItem {
  icon: IconType;
  label: string;
  href: string;
}

const NavItem: React.FC<ISidebarNavItem> = ({ icon: Icon, label, href }) => {
  return (
    <Link draggable={false} to={href} className="nav-item">
      <Icon size={22} />
      <p>{label}</p>
    </Link>
  );
};

export default NavItem;
