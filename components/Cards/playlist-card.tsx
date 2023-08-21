'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

interface PlaylistCardProps {
  uid: string;
  title: string;
  owner: string;
  imageUrl: string;
}

export default function PlaylistCard({
  uid,
  title,
  owner,
  imageUrl,
}: PlaylistCardProps) {
  const router = useRouter();

  const handleRedirect = () => {
    router.push(`/playlist/${uid}`);
  };

  return (
    <div
      onClick={handleRedirect}
      className="group cursor-pointer hover:scale-110 ease-in-out duration-300 min-w-[200px]"
    >
      <Image
        className="rounded-lg"
        src={imageUrl}
        width={200}
        height={200}
        alt="Playlist Cover"
      />
      <div className="mt-1">
        <p className="text-lg font-bold hover:underline cursor-pointer truncate ">
          {title}
        </p>
        <p className="text-inactive hover:underline text-sm">{owner}</p>
      </div>
    </div>
  );
}
