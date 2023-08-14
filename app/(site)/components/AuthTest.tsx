'use client';

import { useSession } from 'next-auth/react';
import React from 'react';

export default function AuthTest() {
  const { data: session } = useSession();

  return <div>{session?.user ? session.user.username : 'No Auth'}</div>;
}
