import { createFileRoute } from '@tanstack/react-router';

const About = () => {
  return <div>About</div>;
};

export const Route = createFileRoute('/about')({ component: About });
