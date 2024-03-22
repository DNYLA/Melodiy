import { createRootRoute, Link, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { Sidebar } from '../components/layout/sidebar';
import Providers from '../providers';

export const Route = createRootRoute({
  component: () => (
    <Providers>
      <Sidebar>
        <Outlet />
      </Sidebar>
      <TanStackRouterDevtools />
    </Providers>
  ),
});
