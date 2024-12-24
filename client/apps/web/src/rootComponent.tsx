import { Sidebar } from '@melodiy/ui/components/Layout/';
import { Outlet, useMatchRoute } from '@melodiy/router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import Providers from './providers';

export function RootComponent() {
  const matchRoute = useMatchRoute();
  const isValid = matchRoute({ to: '/setup' }) || matchRoute({ to: '/admin' });

  if (isValid !== false) {
    return (
      <Providers>
        <Outlet />
      </Providers>
    );
  }

  return (
    <>
      <Providers>
        <Sidebar>
          <Outlet />
        </Sidebar>
        {process.env.NODE_ENV === 'development' && <TanStackRouterDevtools />}
      </Providers>
    </>
  );
}
