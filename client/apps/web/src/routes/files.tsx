import { FilesTable } from '@melodiy/ui/collections';
import { useSession } from '@melodiy/ui/hooks';
import { useLoaderData, useNavigate } from '@melodiy/router';

export default function Files() {
  const session = useSession();
  const tracks = useLoaderData({ from: '/_authenticated/files' });
  const navigate = useNavigate();
  // console.log(session.user);

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
