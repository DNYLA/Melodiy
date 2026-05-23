import { Outlet, type RouterIds, router } from '@melodiy/router';
import { Homepage, PostIdComponent } from '@melodiy/ui';
import { RouterProvider } from '@tanstack/react-router';
import ReactDOM from 'react-dom/client';
import { RootComponent } from './rootComponent';

// Not lazy loaded for simplicity, but you could expose from your library component
// individually, and enforce here to use react lazy components via typings
// so that you have code splitting
const routerMap = {
  '/': Homepage,
  '/posts/$postId': PostIdComponent,
  __root__: RootComponent
} as const satisfies Record<RouterIds, (() => React.ReactElement) | null>;

function EmptyComponent() {
  return <Outlet />;
}

// Map over routes and update views
Object.entries(routerMap).forEach(([path, component]) => {
  const foundRoute = router.routesById[path as RouterIds];
  foundRoute.update({
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    component: component ?? EmptyComponent
  });
});

// And you can do the same logic with custom error pages, and any other properties
const errorComponentMap = {
  '/': null,
  '/posts/$postId': null,
  __root__: null
} as const satisfies Record<RouterIds, React.ComponentType<unknown> | null>;

Object.entries(errorComponentMap).forEach(([path, component]) => {
  if (!component) {
    return;
  }

  const foundRoute = router.routesById[path as RouterIds];
  foundRoute.update({
    errorComponent: component
  });
});

// biome-ignore lint/style/noNonNullAssertion: <tanstack router default code>
const rootElement = document.getElementById('app')!;

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<RouterProvider router={router} />);
}
