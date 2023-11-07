'use client';
import useSession from '@/hooks/useSession';

export default function Profile() {
  const { logout, loading } = useSession();

  return (
    <div className="flex flex-col px-24">
      <h1>Profile</h1>
      <hr />
      <p>Profile Page</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
