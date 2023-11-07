'use client';
import useSession from '@/hooks/useSession';
import Link from 'next/link';
import { useState } from 'react';

export default function Login() {
  const [user, setUser] = useState({
    username: '',
    password: '',
  });
  const { login, loading } = useSession();

  const onSignIn = async () => {
    login(user.username, user.password);
  };

  return (
    <div className="flex flex-col px-24">
      <h1>Login</h1>
      <hr className="mb-2" />
      <label htmlFor="username">Username</label>
      <input
        className="p-1"
        id="username"
        type="text"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder="username"
      />
      <label htmlFor="username">Password</label>
      <input
        className="p-1"
        id="password"
        type="text"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password"
      />

      <button
        onClick={onSignIn}
        disabled={loading}
        className="mb-1 mt-3 rounded-lg border border-gray-300 p-2 focus:border-gray-600 focus:outline-none disabled:bg-red-500"
      >
        Login
      </button>
      <Link href={'/signup'}>Don't have an account. Sign Up Here!</Link>
    </div>
  );
}
