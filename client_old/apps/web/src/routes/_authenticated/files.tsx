import { fetchUserTracks } from '@melodiy/api';
import { FilesTable } from '@melodiy/collections';
import { useSession } from '@melodiy/ui';
import { createFileRoute } from '@tanstack/react-router';
import { useEffect } from 'react';

function Files() {
  const session = useSession();
  const tracks = Route.useLoaderData();

  useEffect(() => {
    console.log('re-rendering');
  }, [session.user]);

  if (session.user == null) {
    //TODO; redirect
    return <div></div>;
  }

  return (
    <main className="flex flex-col w-full gap-y-5">
      <FilesTable data={tracks} username={session.user?.username} />
    </main>
  );
}

export const Route = createFileRoute('/_authenticated/files')({
  loader: () => fetchUserTracks(),
  component: Files,
});