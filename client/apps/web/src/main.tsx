import { initialiseAxios } from '@melodiy/api';
import {
  queryClient,
  router,
  RouterIds,
  RouterProvider,
} from '@melodiy/router';
import { QueryClientProvider } from '@tanstack/react-query';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RootComponent } from './rootComponent';
import Admin from './routes/admin';
import Album from './routes/album';
import Artist from './routes/artist';
import Files from './routes/files';
import Playlist from './routes/playlist';
import Search from './routes/search';
import Setup from './routes/setup';
import './styles.css';

//Override root component or other custom routes that require ui lib data
const routerMap = {
  __root__: RootComponent,
  '/admin': Admin,
  '/album/$id': Album,
  '/artist/$id': Artist,
  '/_authenticated/files': Files,
  '/playlist/$id': Playlist,
  '/search': Search,
  '/setup': Setup,
} as const satisfies Partial<Record<RouterIds, () => React.ReactElement>>;

Object.entries(routerMap).forEach(([path, component]) => {
  const foundRoute = router.routesById[path as RouterIds];
  if (foundRoute == null) return;

  foundRoute.update({
    component,
  });
});

const apiUrl =
  import.meta.env.MODE === 'development' ? 'http://localhost:5129/api' : '/api';
initialiseAxios(apiUrl);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
