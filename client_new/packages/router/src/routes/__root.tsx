import { QueryClient } from '@tanstack/react-query';
import { createRootRouteWithContext, Link } from '@tanstack/react-router';
import { User } from '@melodiy/types';

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
