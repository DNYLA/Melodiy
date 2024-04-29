import { fetchPlaylist } from '@melodiy/api';
import { PlaylistTable } from '@melodiy/collections';
import { createFileRoute } from '@tanstack/react-router';

function Playlist() {
  const { id } = Route.useParams();
  const playlist = Route.useLoaderData();
  const navigate = Route.useNavigate();

  if (!playlist) {
    navigate({ to: '/' });
    return;
  }

  return (
    <main className="flex w-full flex-col gap-y-5">
      <PlaylistTable data={playlist} />
    </main>
  );
}

export const Route = createFileRoute('/playlist/$id')({
  loader: ({ params }) => fetchPlaylist(params.id),
  component: Playlist,
});
