import { createRootRoute, Link } from '@tanstack/react-router';

export const Route = createRootRoute({
  notFoundComponent: () => {
    return (
      <div>
        <p>Component not found!</p>
        <Link to="/">Home</Link>
      </div>
    );
  }
});
