'use client';
import Recents from '@/app/(site)/components/Recents';

export default function Home() {
  return (
    <main className="base-container flex h-full w-full flex-col gap-y-5 pt-24">
      <Recents />
    </main>
  );
}
