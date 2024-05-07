import { initialiseAxios } from '@melodiy/api';
import { useAuthModal, useSession } from '@melodiy/shared-ui';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import ReactDOM from 'react-dom/client';
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

const apiUrl = import.meta.env.VITE_API_URL;
if (!apiUrl) throw Error('Invalid API URL');
initialiseAxios(apiUrl);

// Render the app
const rootElement = document.getElementById('root')!;

function App() {
  const session = useSession();
  const modal = useAuthModal();
  return (
    <RouterProvider
      router={router}
      context={{
        user: session.user,
        loading: session.loading,
        open: modal.onOpen,
      }}
    />
  );
}

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<App />);
}
