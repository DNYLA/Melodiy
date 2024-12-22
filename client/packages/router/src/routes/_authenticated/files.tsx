import { fetchUserTracks } from '@melodiy/api';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/files')({
  loader: () => fetchUserTracks(),
});
