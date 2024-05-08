import { useIsFetching } from '@tanstack/react-query';
import { useRouter } from '@tanstack/react-router';
import { AiOutlineHome } from 'react-icons/ai';
import { MdOutlineAudioFile, MdOutlineFavorite } from 'react-icons/md';
import { useSession } from '../../../hooks/useSession';
import Library from './Library';
import NavItem from './NavItem';

export default function SidebarHeader() {
  const session = useSession();
  const router = useRouter();
  const isLoading = useIsFetching({
    predicate: (query) => query.state.status === 'pending',
  });

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
    <div className="relative h-full w-[235px] min-w-[100px] max-w-[400px] select-none flex-col gap-y-2 bg-sidebar-background px-4 py-2 md:flex">
      <div className="relative flex flex-row items-center justify-center gap-x-5">
        <p>Melodiy</p>
        {/* {isLoading > 0 && <FaSpinner size={18} className="animate-spin" />} */}
      </div>

      <div className="flex flex-col py-4 gap-y-1">
        <p className="text-lg font-semibold truncate">Browse</p>
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
