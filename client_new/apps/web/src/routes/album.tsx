import { useLoaderData, useNavigate } from '@melodiy/router';
import { AlbumTable } from '@melodiy/ui/collections';

export default function Album() {
  const album = useLoaderData({ from: '/album/$id' });
  const navigate = useNavigate();

  if (!album) {
    navigate({ to: '/' });
    return;
  }

  return (
    <div className="flex flex-col w-full gap-y-5">
      <AlbumTable data={album} />
    </div>
  );
}
