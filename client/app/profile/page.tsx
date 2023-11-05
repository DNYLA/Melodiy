'use client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function Profile() {
  const router = useRouter();
  const [user, setUser] = useState({
    username: '',
    password: '',
  });

  const logout = async () => {
    try {
      await axios.get('/api/logout');
      toast.success('Logout successfull');
      router.push('/login');
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  return (
    <div className="flex flex-col px-24">
      <h1>Profile</h1>
      <hr />
      <p>Profile Page</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
