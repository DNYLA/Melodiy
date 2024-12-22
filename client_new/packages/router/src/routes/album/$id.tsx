import { fetchAlbum } from '@melodiy/api';
// import { AlbumTable } from '@melodiy/ui/collections';
import { createFileRoute } from '@tanstack/react-router';

function Artist() {
  const album = Route.useLoaderData();
  const navigate = Route.useNavigate();

  if (!album) {
    navigate({ to: '/' });
    return;
  }

  return (
    <div className="flex flex-col w-full gap-y-5">
      {/* <AlbumTable data={album} /> */}
    </div>
  );
}

export const Route = createFileRoute('/album/$id')({
  loader: ({ params }) => fetchAlbum(params.id),
  component: Artist,
});
