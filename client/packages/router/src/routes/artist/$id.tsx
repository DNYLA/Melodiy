import { fetchArtist } from '@melodiy/api';
import { createFileRoute, defer } from '@tanstack/react-router';

export const Route = createFileRoute('/artist/$id')({
  loader: ({ params }) => {
    return { artist: defer(fetchArtist(params.id)) };
  },
});
