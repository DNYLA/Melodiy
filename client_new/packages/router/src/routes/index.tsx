import { createFileRoute } from '@tanstack/react-router';

// This comment is needed when defining a new route as it doesn't exist in the routeTree.gen.ts.
// ensure once the new route is created the comment is removed it is left in index.tsx as a reference.
// @ts-ignore: Route Not defined
export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>
    </div>
  );
}
