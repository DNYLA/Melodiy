import { getServerSession } from '@/actions/auth';
import { getUserTracks } from '@/actions/playlist';
import { redirect } from 'next/navigation';

export default async function Files() {
  const { token } = await getServerSession();
  if (!token) return redirect('/');

  const myTracks = await getUserTracks(token);

  return (
    <main className="flex flex-col px-24">
      <h1>Files</h1>
      <hr />
      <br />
      <p>Your Files</p>
    </main>
  );
}
