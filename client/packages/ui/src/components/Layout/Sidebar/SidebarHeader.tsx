import NavItem from './NavItem';
import { Icons } from '../../Utils';

function SidebarHeader() {
  const session = false;
  const routes = [
    {
      icon: Icons.Like,
      label: 'Liked songs',
      href: '/',
      authentication: false,
    },
    {
      icon: Icons.Save,
      label: 'Saves',
      href: '/',
      authentication: false,
    },
    {
      icon: Icons.Album,
      label: 'Albums',
      href: '/liked',
      authentication: false,
    },
    {
      icon: Icons.Folder,
      label: 'Folders',
      href: '/files',
      authentication: true,
    },
    {
      icon: Icons.Artist,
      label: 'My Content',
      href: '/files',
      authentication: true,
    },
  ];

  return (
    <div className="relative h-full w-[260px] select-none flex-col bg-accent rounded-[10px]">
      <div className="flex gap-2.5 pl-4 items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          className="w-[50px] h-[50px] p-2"
        >
          <path
            d="M3.56201 3.35669V20.6435"
            stroke="#E0E0E0"
            stroke-width="2.02054"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M9.32422 3.35669V20.6435"
            stroke="#E0E0E0"
            stroke-width="2.02054"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M15.0864 20.6435V3.35669L20.8487 7.34596V20.6435H15.0864Z"
            fill="#E0E0E0"
            stroke="#E0E0E0"
            stroke-width="2.02054"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <span className="text-lg">My Library</span>
      </div>

      <div className="flex flex-col gap-2.5 px-3.5 pt-5">
        {session == null
          ? routes
              .filter((item) => !item.authentication)
              .map((item) => <NavItem key={item.label} {...item} />)
          : routes.map((item) => <NavItem key={item.label} {...item} />)}
      </div>
    </div>
  );
}

export default SidebarHeader;
