import { QueryClient } from '@tanstack/react-query';
import { createRootRouteWithContext } from '@tanstack/react-router';
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
      <div className="content-center w-full h-full text-center ">
        <h1 className="text-xl">404 Not Found</h1>
        <p>The page you are looking for could not be found.</p>
      </div>
    );
  },
});
