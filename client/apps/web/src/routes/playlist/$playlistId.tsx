import { fetchPlaylist } from '@melodiy/api';
import { createFileRoute } from '@tanstack/react-router';

function Playlist() {
  const { playlistId } = Route.useParams();
  const playlist = Route.useLoaderData();

  if (!playlist) {
    return <div>None</div>;
  }

  return <div>Playlist {playlist.title}</div>;
}

export const Route = createFileRoute('/playlist/$playlistId')({
  loader: ({ params }) => fetchPlaylist(params.playlistId),
  component: Playlist,
});
