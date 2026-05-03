import { router } from './router';

export type { RouterIds, RouterType } from './router';

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export type { ErrorComponentProps } from '@tanstack/react-router';
// By re exporting the api from TanStack router, we can enforce that other packages
// rely on this one instead, making the type register being applied
export {
  ErrorComponent,
  getRouteApi,
  Link,
  Outlet,
  RouterProvider,
  useRouteContext,
  useRouter,
} from '@tanstack/react-router';
export { router };
