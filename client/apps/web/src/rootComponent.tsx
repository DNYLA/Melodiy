import { Outlet, useMatchRoute } from '@melodiy/router';
import { Sidebar } from '@melodiy/ui/components/Layout/';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import Providers from './providers';

export function RootComponent() {
  const matchRoute = useMatchRoute();
  const isValid = matchRoute({ to: '/setup' }) || matchRoute({ to: '/admin' });

  console.log(
    `%cMELODIY v${__MELODIY_VERSION__}`,
    'background: white;color: black;font-size: large;padding: 3px 5px;'
  );

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
