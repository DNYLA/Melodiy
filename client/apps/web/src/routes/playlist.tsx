import { useLoaderData, useNavigate } from '@melodiy/router';
import { PlaylistTable } from '@melodiy/ui/collections';

export default function Playlist() {
  const playlist = useLoaderData({ from: '/playlist/$id' });
  const navigate = useNavigate();

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
