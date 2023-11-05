'use client';
import { useState } from 'react';

export default function UserProfile({ params }: any) {
  const [user, setUser] = useState({
    username: '',
    password: '',
  });

  return (
    <div className="flex flex-col px-24">
      <h1>Profile</h1>
      <hr />
      <p className="text-red text-4xl">Profile Page {params.id}</p>
    </div>
  );
}
