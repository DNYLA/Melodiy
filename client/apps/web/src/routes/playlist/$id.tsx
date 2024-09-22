import { fetchPlaylist } from '@melodiy/api';
import { PlaylistTable } from '@melodiy/ui/collections';
import { createFileRoute } from '@tanstack/react-router';

function Playlist() {
  const playlist = Route.useLoaderData();
  const navigate = Route.useNavigate();

  if (!playlist) {
    navigate({ to: '/' });
    return;
  }

  return (
    <main className="flex flex-col w-full gap-y-5">
      <PlaylistTable data={playlist} />
    </main>
  );
}

export const Route = createFileRoute('/playlist/$id')({
  loader: ({ params }) => fetchPlaylist(params.id),
  component: Playlist,
});
