/* eslint-disable @typescript-eslint/no-unused-vars */
import { useLoaderData, useNavigate } from '@melodiy/router';
import { useSession } from '@melodiy/ui/hooks';
import { ProfileSettings } from '@melodiy/ui/settings';

export default function Settings() {
  const session = useSession();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const tracks = useLoaderData({ from: '/_authenticated/settings' });
  const navigate = useNavigate();

  // if (session.user == null) {
  //   navigate({ to: '/' });
  //   return <div></div>;
  // }

  return (
    <main className="flex flex-col w-full p-8 gap-y-5">
      <h1 className="mb-5 text-2xl font-medium">Settings</h1>

      <ProfileSettings />
    </main>
  );
}
