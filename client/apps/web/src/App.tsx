/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { initialiseAxios } from '@melodiy/api';
// import { useAuthModal, useSession } from '@melodiy/ui/hooks';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';
import './styles.css';

// Create a new router instance
const router = createRouter({
  routeTree,
  context: { user: undefined, loading: undefined!, open: undefined! },
});

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const apiUrl =
  import.meta.env.MODE === 'development' ? 'http://127.0.0.1:5129/api' : '/api';
initialiseAxios(apiUrl);

export function App() {
  // const session = useSession();
  // const modal = useAuthModal();

  return (
    <RouterProvider
      router={router}
      // context={{
      //   user: session.user,
      //   loading: session.loading,
      //   open: modal.onOpen,
      // }}
    />
  );
}

export default App;
