import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { QueryClientProvider } from '@tanstack/react-query';
import {
  queryClient,
  router,
  RouterIds,
  RouterProvider,
} from '@melodiy/router';
import { Button } from '@melodiy/ui';
import { RootComponent } from './rootComponent';

//Override root component or other custom routes that require ui lib data
const routerMap = {
  __root__: RootComponent,
} as const satisfies Partial<Record<RouterIds, () => React.ReactElement>>;

Object.entries(routerMap).forEach(([path, component]) => {
  const foundRoute = router.routesById[path as RouterIds];
  if (foundRoute == null) return;

  foundRoute.update({
    component,
  });
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Button />
    </QueryClientProvider>
  </StrictMode>
);
