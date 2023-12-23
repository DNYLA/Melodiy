import { getServerSession } from '@/actions/auth';
import { redirect } from 'next/navigation';
import FavouritesTable from './table';

export default async function Files() {
  const session = await getServerSession();
  if (!session) return redirect('/');

  return (
    <main className="flex w-full flex-col gap-y-5">
      <FavouritesTable data={[]} username={session.username} />
    </main>
  );
}
