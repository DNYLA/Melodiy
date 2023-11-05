'use client';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function SignUp() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    username: '',
    password: '',
  });

  const onSignup = async () => {
    try {
      setLoading(true);
      const res = await axios.post('/api/signup', user);
      toast.success(res.data.message);
      router.push('/login');
    } catch (err: any) {
      toast.error(err.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col px-24">
      <h1>Sign Up</h1>
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
        disabled={loading}
        onClick={onSignup}
        className="mb-1 mt-3 rounded-lg border border-gray-300 p-2 focus:border-gray-600 focus:outline-none disabled:bg-neutral-800"
      >
        Signup
      </button>
      <Link href={'/login'}>Already got an account. Login!</Link>
    </div>
  );
}
