import { getPlaylist } from '@/actions/playlist';
import { redirect } from 'next/navigation';
import PlaylistTable from './table';

export default async function Playlist({ params }: { params: { id: string } }) {
  const playlist = await getPlaylist(params.id);
  if (!playlist) {
    return redirect('/');
  }

  return (
    <main className="flex w-full flex-col gap-y-5">
      <PlaylistTable data={playlist} />
    </main>
  );
}
