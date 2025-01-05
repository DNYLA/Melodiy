import { fetchFeed } from '@melodiy/api';
import { createFileRoute, defer } from '@tanstack/react-router';

// This comment is needed when defining a new route as it doesn't exist in the routeTree.gen.ts.
// ensure once the new route is created the comment is removed it is left in index.tsx as a reference.
/* //@ts-expect-error: Route Not defined */
export const Route = createFileRoute('/')({
  loader: () => {
    return { feed: defer(fetchFeed()) };
  },
});
