'use client';
import { AuthResult } from '@/types/user';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    username: '',
    password: '',
  });

  const onSignIn = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post<AuthResult>('/api/auth/login', user);
      // const res = await loginUserAction(user.username, user.password);

      toast.success('Succesfully created user');

      //TODO: Update user context.

      router.push('/profile');
    } catch (err: any) {
      toast.error(err.response.data.error);
    } finally {
      setLoading(false);
    }
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
        className="mb-1 mt-3 rounded-lg border border-gray-300 p-2 focus:border-gray-600 focus:outline-none"
      >
        Login
      </button>
      <Link href={'/signup'}>Don't have an account. Sign Up Here!</Link>
    </div>
  );
}
