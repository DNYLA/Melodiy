import { createRootRoute, Link, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { Sidebar } from '../components/layout/sidebar';

export const Route = createRootRoute({
  component: () => (
    <>
      <Sidebar>
        <Outlet />
      </Sidebar>
      <TanStackRouterDevtools />
    </>
  ),
});
