import { QueryClient } from '@tanstack/react-query';
import { createRootRouteWithContext, Link } from '@tanstack/react-router';
// import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { User } from '@melodiy/types';

// export const Route = createRootRoute({
//   component: () => (
//     <>
//       <div className="p-2 flex gap-2">
//         <Link to="/" className="[&.active]:font-bold">
//           Home
//         </Link>{' '}
//         <Link to="/" className="[&.active]:font-bold">
//           About
//         </Link>
//       </div>
//       <hr />
//       <Outlet />
//       <TanStackRouterDevtools />
//     </>
//   ),
// });

type RouterContext = {
  queryClient: QueryClient;
  user?: User;
  loading: boolean;
  open: () => void;
};

//This gets updated in the app\web
export const Route = createRootRouteWithContext<RouterContext>()({
  notFoundComponent: () => {
    return (
      <div>
        <p>This is the notFoundComponent configured on root route</p>
        <Link to="/">Start Over</Link>
      </div>
    );
  },
});
