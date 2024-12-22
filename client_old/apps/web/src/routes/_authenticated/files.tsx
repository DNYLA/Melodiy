import { fetchUserTracks } from '@melodiy/api';
import { FilesTable } from '@melodiy/ui/collections';
import { useSession } from '@melodiy/ui/hooks';
import { createFileRoute, useNavigate } from '@tanstack/react-router';

function Files() {
  const session = useSession();
  const tracks = Route.useLoaderData();
  const navigate = useNavigate();
  if (session.user == null) {
    navigate({ to: '/' });
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
