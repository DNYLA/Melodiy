'use client';

import { Playlist } from '@/types/playlist';
import { useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import React from 'react';
import toast from 'react-hot-toast';
import useSWR from 'swr';
import { twMerge } from 'tailwind-merge';

//TODO: Conver to Server component
export default function PlaylistBody() {
  const { data: session } = useSession();
  const router = useRouter();
  const path = usePathname();

  const {
    data: playlists,
    isLoading,
    error,
  } = useSWR<ServiceResponse<Playlist[]>>(
    session?.user.accessToken ? '/playlist' : null
  );

  if (isLoading) return <>Loading...</>;
  if (error || !playlists?.data || !playlists?.success) {
    toast.error(playlists?.message ?? 'Unexpected Error Occured');

    return <></>;
  }

  return (
    <div className="flex flex-col mx-2 overflow-hidden text-sm font-light gap-y-1 text-inactive">
      {playlists.data.map((playlist: any) => (
        <p
          key={playlist.shareId}
          className={twMerge(
            `cursor-pointer truncate ... hover:text-white`,
            path === `/playlist/${playlist.shareId}` && 'text-white'
          )}
          onClick={() => router.push(`/playlist/${playlist.shareId}`)}
        >
          {playlist.title}
        </p>
      ))}
    </div>
  );
}
