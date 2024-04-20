import { createRootRoute, Link, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { Sidebar } from '@melodiy/shared-ui';
import Providers from '../providers';

export const Route = createRootRoute({
  component: () => (
    <Providers>
      <Sidebar>
        <Outlet />
      </Sidebar>
      {process.env.NODE_ENV === 'development' && <TanStackRouterDevtools />}
    </Providers>
  ),
});
