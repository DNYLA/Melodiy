import { createFileRoute } from '@tanstack/react-router';

const Homepage = () => {
  return <div>Homepage</div>;
};

export const Route = createFileRoute('/')({
  component: Homepage,
});
