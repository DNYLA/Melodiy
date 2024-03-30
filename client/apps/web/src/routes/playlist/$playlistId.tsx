import { createFileRoute } from '@tanstack/react-router';

function Playlist() {
  const { playlistId } = Route.useParams();
  return <div>Playlist {playlistId}</div>;
}

export const Route = createFileRoute('/playlist/$playlistId')({
  loader: ({ params }) => fetchPlaylist(params.playlistId),
  component: Playlist,
});
