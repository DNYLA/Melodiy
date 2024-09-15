import { Sidebar } from '@melodiy/ui/components/Layout/';
import { User } from '@melodiy/types';
import {
  Outlet,
  createRootRouteWithContext,
  useMatchRoute,
} from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
// import Providers from '../providers';

type RouterContext = {
  user?: User;
  loading: boolean;
  open: () => void;
};

function RooutLayout() {
  const matchRoute = useMatchRoute();
  // const isValid = matchRoute({ to: '/setup' }) || matchRoute({ to: '/admin' });

  // if (isValid !== false) {
  //   return (
  //     <Providers>
  //       <Outlet />
  //     </Providers>
  //   );
  // }

  return (
    <>
      {/* <Providers> */}
      <Sidebar>
        <Outlet />
      </Sidebar>
      {/* <Player /> */}
      {process.env.NODE_ENV === 'development' && <TanStackRouterDevtools />}
      {/* </Providers> */}
    </>
  );
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RooutLayout,
});
