import { fetchAlbum } from '@melodiy/api';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/album/$id')({
  loader: ({ params }) => fetchAlbum(params.id),
});
