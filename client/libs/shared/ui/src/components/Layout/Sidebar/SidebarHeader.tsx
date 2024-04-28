import { AiOutlineHome } from 'react-icons/ai';
import { MdOutlineAudioFile, MdOutlineFavorite } from 'react-icons/md';
import NavItem from './NavItem';
import Library from './Library';
import { useSession } from '../../../hooks/useSession';

export default function SidebarHeader() {
  const session = useSession();
  const routes = [
    {
      icon: AiOutlineHome,
      label: 'Home',
      href: '/',
      authentication: false,
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
      authentication: false,
    },
    {
      icon: MdOutlineAudioFile,
      label: 'Your Files',
      href: '/files',
      authentication: true,
    },
  ];

  return (
    <div className="relative h-full w-[250px] min-w-[100px] max-w-[400px] select-none flex-col gap-y-2 bg-sidebar-background px-4 py-2 md:flex">
      <div className="relative flex flex-row items-center justify-center">
        <p>Melodiy</p>
      </div>

      <div className="flex flex-col gap-y-1 py-4">
        <p className="truncate text-lg font-semibold">Browse</p>
        <div className="mx-2">
          {session.user == null
            ? routes
                .filter((item) => !item.authentication)
                .map((item) => <NavItem key={item.label} {...item} />)
            : routes.map((item) => <NavItem key={item.label} {...item} />)}
        </div>
      </div>

      <Library />
    </div>
  );
}
