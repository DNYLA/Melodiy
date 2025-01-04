import { fetchProfile } from '@melodiy/api';
import { createFileRoute, defer } from '@tanstack/react-router';

export const Route = createFileRoute('/profile/$id')({
  loader: ({ params }) => {
    return { user: defer(fetchProfile(params.id)) };
  },
});
