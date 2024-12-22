import { DiscoverIcon, HomeIcon } from '@melodiy/icons';
import { Link } from '@tanstack/react-router';
import AuthSection from './AuthSection';
import { SearchInput } from './SearchInput';

function Navbar() {
  const navItems = [
    {
      icon: HomeIcon,
      label: 'Home',
      href: '/',
    },
    {
      icon: DiscoverIcon,
      label: 'Discover',
      href: '/discover',
    },
  ];

  return (
    <div
      // style={{ width: `calc(100% - 20px )` }}
      className="top-0 z-[100] flex h-[70px] w-full flex-row justify-between px-2 py-3 sticky bg-[#060606]"
    >
      <div className="flex flex-row items-center gap-x-3">
        {navItems.map((link) => (
          <Link
            draggable={false}
            to={link.href}
            className="[&.active]:rounded-[10px] [&.active]:bg-accent [&.active]:text-content text-base-accent flex flex-row items-center gap-x-1.5 pr-20 py-[1px] group hover:text-content"
          >
            <link.icon
              width={45}
              height={45}
              className="group-hover:stroke-content group-[&.active]:stroke-content p-1"
            />
            <span className="">{link.label}</span>
          </Link>
        ))}

        <SearchInput />
      </div>

      <AuthSection />
    </div>
  );
}

export { Navbar };
