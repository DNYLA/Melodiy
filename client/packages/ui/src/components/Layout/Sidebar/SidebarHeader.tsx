import { ArtistIcon, FolderIcon } from '@melodiy/icons';
import { useSession } from '../../../hooks';
import Library from './Library';
import NavItem from './NavItem';

function SidebarHeader() {
  const session = useSession();
  const routes = [
    // {
    //   icon: LikeIcon,
    //   label: 'Liked songs',
    //   href: '/liked',
    //   authentication: false,
    // },
    // {
    //   icon: SaveIcon,
    //   label: 'Saves',
    //   href: '/saved',
    //   authentication: false,
    // },
    // {
    //   icon: AlbumIcon,
    //   label: 'Albums',
    //   href: '/albums',
    //   authentication: false,
    // },
    {
      icon: FolderIcon,
      label: 'Folders',
      href: '/folders',
      authentication: true,
    },
    {
      icon: ArtistIcon,
      label: 'My Content',
      href: '/files',
      authentication: true,
    },
  ];

  return (
    <div className="flex h-full w-[260px] select-none flex-col bg-accent rounded-[10px]">
      <div className="flex gap-2.5 pl-4 items-center pt-2">
        <img src="./logo.png" className="items-center w-10 h-10 text-center" />

        <span className="text-lg">My Library</span>
      </div>

      <div className="flex flex-col px-3.5 pt-5 pb-2">
        <Library />

        {session.user == null
          ? routes
              .filter((item) => !item.authentication)
              .map((item) => <NavItem key={item.label} {...item} />)
          : routes.map((item) => <NavItem key={item.label} {...item} />)}
      </div>
    </div>
  );
}

export default SidebarHeader;
