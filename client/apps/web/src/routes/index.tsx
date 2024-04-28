import { Recents } from '@melodiy/shared-ui';
import { createFileRoute } from '@tanstack/react-router';

function Homepage() {
  return (
    // <main className="base-container flex h-full w-full flex-col gap-y-5 pt-24">
    <main className="base-container p-3 pb-4 pt-8 mt-9">
      <Recents />
    </main>
  );
}

export const Route = createFileRoute('/')({
  component: Homepage,
});
