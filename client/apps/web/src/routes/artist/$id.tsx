import { fetchPlaylist } from '@melodiy/api';
import { PlaylistTable } from '@melodiy/collections';
import { createFileRoute } from '@tanstack/react-router';

function Artist() {
  const { id } = Route.useParams();
  // const playlist = Route.useLoaderData();

  return (
    <main className="flex w-full flex-col gap-y-5">
      {/* <PlaylistTable data={playlist} /> */}
      {id}
    </main>
  );
}

export const Route = createFileRoute('/artist/$id')({
  // loader: ({ params }) => fetchPlaylist(params.id),
  component: Artist,
});
