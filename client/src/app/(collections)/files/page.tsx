import { getServerSession } from '@/actions/auth';
import { getUserTracks } from '@/actions/collections';
import FilesTable from '@/app/(collections)/files/table';
import { redirect } from 'next/navigation';

export default async function Files() {
  const session = await getServerSession();
  if (!session) return redirect('/');
  const myTracks = await getUserTracks();

  return (
    <main className="flex w-full flex-col gap-y-5">
      <FilesTable data={myTracks} username={session.username} />
    </main>
  );
}
