import { fetchAlbum } from '@melodiy/api';
import { AlbumTable } from '@melodiy/collections';
import { createFileRoute } from '@tanstack/react-router';

function Artist({ params }: { params: { id: string } }) {
  const album = Route.useLoaderData();
  const navigate = Route.useNavigate();

  if (!album) {
    navigate({ to: '/' });
    return;
  }

  return (
    <main className="flex flex-col w-full gap-y-5">
      <AlbumTable data={album} />
    </main>
  );
}

export const Route = createFileRoute('/album/$id')({
  loader: ({ params }) => fetchAlbum(params.id),
  component: Artist,
});
