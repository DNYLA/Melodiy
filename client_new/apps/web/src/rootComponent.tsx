// import { Sidebar } from '@melodiy/ui/components/Layout/';
import { Link, Outlet } from '@melodiy/router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
// import Providers from '../providers';

export function RootComponent() {
  return (
    <>
      <div className="p-2 flex gap-2 text-lg">
        <Link
          to="/"
          activeProps={{
            className: 'font-bold',
          }}
          activeOptions={{ exact: true }}
        >
          Posts list
        </Link>
      </div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools position="bottom-right" />
    </>
  );
}
