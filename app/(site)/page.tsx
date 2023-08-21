import AuthTest from '@/app/(site)/components/AuthTest';
import Trending from '@/app/(site)/components/trending';
import React from 'react';

export default async function Home() {
  return (
    <div className="w-full h-full overflow-hidden overflow-y-auto rounded-lg mt-3">
      <Trending />
    </div>
  );
}
