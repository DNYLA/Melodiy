import { fetchPlaylist } from '@melodiy/api';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/playlist/$id')({
  loader: ({ params }) => fetchPlaylist(params.id),
});
