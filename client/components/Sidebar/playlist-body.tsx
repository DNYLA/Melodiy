'use client';

import usePlaylistStore from '@/hooks/stores/usePlaylistStore';
import { ServiceResponse } from '@/types';
import { Playlist } from '@/types/playlist';
import { fetcher } from '@/utils/network/axios';
import { useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import React, { useEffect } from 'react';
import useSWR from 'swr';
import { twMerge } from 'tailwind-merge';

//TODO: Conver to Server component
export default function PlaylistBody() {
  const { data: session } = useSession();
  const router = useRouter();
  const path = usePathname();
  const { setPlaylists } = usePlaylistStore();
  const {
    data: playlists,
    isLoading,
    error,
  } = useSWR<ServiceResponse<Playlist[]>>(
    session?.user.accessToken ? '/playlist' : null,
    fetcher
  );

  useEffect(() => {
    if (!playlists || !playlists.data) return;
    setPlaylists(playlists?.data);
  }, [playlists, setPlaylists]);

  if (isLoading) return <>Loading...</>;
  if (error || !playlists?.data || !playlists?.success) {
    // console.log(error);
    // console.log()
    // toast.error(playlists?.message ?? 'Unexpected Error Occured');

    return <></>;
  }

  return (
    <div className="flex flex-col mx-2 overflow-hidden text-sm font-light gap-y-1 text-inactive">
      {playlists.data.map((playlist: Playlist) => (
        <p
          key={playlist.uid}
          className={twMerge(
            `cursor-pointer truncate ... hover:text-white`,
            path === `/playlist/${playlist.uid}` && 'text-white'
          )}
          onClick={() => router.push(`/playlist/${playlist.uid}`)}
        >
          {playlist.title}
        </p>
      ))}
    </div>
  );
}
