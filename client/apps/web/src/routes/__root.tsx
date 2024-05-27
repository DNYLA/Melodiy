import { Player, Sidebar } from '@melodiy/shared-ui';
import { User } from '@melodiy/types';
import {
  Outlet,
  createRootRouteWithContext,
  useMatchRoute,
} from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import Providers from '../providers';

type RouterContext = {
  user?: User;
  loading: boolean;
  open: () => void;
};

function RooutLayout() {
  const matchRoute = useMatchRoute();
  const isValid = matchRoute({ to: '/setup' });

  if (isValid !== false) {
    return <Outlet />;
  }

  return (
    <Providers>
      <Sidebar>
        <Outlet />
      </Sidebar>
      <Player />
      {process.env.NODE_ENV === 'development' && <TanStackRouterDevtools />}
    </Providers>
  );
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RooutLayout,
});
