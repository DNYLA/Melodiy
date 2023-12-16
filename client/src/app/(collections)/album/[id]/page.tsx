import { getAlbum } from '@/actions/collections';
import { redirect } from 'next/navigation';
import AlbumTable from './table';

export default async function Album({ params }: { params: { id: string } }) {
  const album = await getAlbum(params.id);
  if (!album) {
    return redirect('/');
  }

  return (
    <main className="flex w-full flex-col gap-y-5">
      <AlbumTable data={album} />
    </main>
  );
}
