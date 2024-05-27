import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/setup')({
  component: () => <div>Hello /setup!</div>,
});
