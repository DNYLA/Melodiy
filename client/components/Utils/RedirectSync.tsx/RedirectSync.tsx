'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';

interface RedirectProps {
  message?: string;
}

export default function RedirectSync({ message }: RedirectProps) {
  const router = useRouter();
  if (message) toast.error(message);

  useEffect(() => {
    router.push('/');
  });

  return <></>;
}
