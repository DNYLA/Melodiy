'use client';
import { useState } from 'react';

export default function Profile() {
  const [user, setUser] = useState({
    username: '',
    password: '',
  });

  return (
    <div className="flex flex-col px-24">
      <h1>Profile</h1>
      <hr />
      <p>Profile Page</p>
    </div>
  );
}
