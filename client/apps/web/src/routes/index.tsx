import { Recents } from '@melodiy/shared-ui';
import { createFileRoute } from '@tanstack/react-router';

function Homepage() {
  return (
    // <main className="flex flex-col w-full h-full pt-24 base-container gap-y-5">
    <main className="p-3 pt-8 pb-4 base-container mt-9">
      <Recents />
    </main>
  );
}

export const Route = createFileRoute('/')({
  component: Homepage,
});
