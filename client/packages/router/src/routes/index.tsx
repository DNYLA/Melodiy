import { createFileRoute } from '@tanstack/react-router';

function Homepage() {
  return (
    <main className="flex p-3 pt-8 pb-4 base-container mt-9 place-items-center gap-x-1">
      <img src="/logo.png" className="items-center w-10 text-center" />
      <p>Home Page (WIP)</p>
    </main>
  );
}

// This comment is needed when defining a new route as it doesn't exist in the routeTree.gen.ts.
// ensure once the new route is created the comment is removed it is left in index.tsx as a reference.
/* //@ts-expect-error: Route Not defined */
export const Route = createFileRoute('/')({
  component: Homepage,
});
