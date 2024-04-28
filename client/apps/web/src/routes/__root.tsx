import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { Player, Sidebar } from '@melodiy/shared-ui';
import Providers from '../providers';
import { User } from '@melodiy/types';

type RouterContext = {
  user?: User;
  loading: boolean;
  open: () => void;
};

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <Providers>
      <Sidebar>
        <Outlet />
      </Sidebar>
      <Player />
      {/* {process.env.NODE_ENV === 'development' && <TanStackRouterDevtools />} */}
    </Providers>
  ),
});
