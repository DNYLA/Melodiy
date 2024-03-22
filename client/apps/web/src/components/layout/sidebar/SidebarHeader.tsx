import { AiOutlineHome } from 'react-icons/ai';
import { MdOutlineAudioFile, MdOutlineFavorite } from 'react-icons/md';
import NavItem from './NavItem';

export default function SidebarNav() {
  const routes = [
    {
      icon: AiOutlineHome,
      label: 'Home',
      href: '/',
    },
    // {
    //   icon: AiOutlineCompass,
    //   label: 'Discover',
    //   active: pathname === '/discover',
    //   href: '/discover',
    // },
    {
      icon: MdOutlineFavorite,
      label: 'Favourites',
      href: '/liked',
    },
    {
      icon: MdOutlineAudioFile,
      label: 'Your Files',
      href: '/files	',
    },
  ];

  return (
    <div className="sidebar-header">
      <div>
        <p>Melodiy</p>
      </div>

      <div className="sidebar-nav-container">
        <p>Browse</p>
        <div>
          {routes.map((item) => (
            <NavItem key={item.label} {...item} />
          ))}
        </div>
      </div>

      {/* <Library /> */}
    </div>
  );
}
