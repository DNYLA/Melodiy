'use client';
import useSession from '@/hooks/useSession';

export default function Profile() {
  const { signOut, loading } = useSession();

  return (
    <main className="flex flex-col px-24">
      <h1>Profile</h1>
      <hr />
      <p>Profile Page</p>
      <button onClick={signOut}>Logout</button>
    </main>
  );
}
