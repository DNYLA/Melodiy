import { createFileRoute } from '@tanstack/react-router';

function Homepage() {
  return (
    // <main className="flex flex-col w-full h-full pt-24 base-container gap-y-5">
    <main className="flex p-3 pt-8 pb-4 base-container mt-9">
      Homee Page
      <img src="./vite.svg" />
    </main>
  );
}

// This comment is needed when defining a new route as it doesn't exist in the routeTree.gen.ts.
// ensure once the new route is created the comment is removed it is left in index.tsx as a reference.
/* //@ts-expect-error: Route Not defined */
export const Route = createFileRoute('/')({
  component: Homepage,
});
