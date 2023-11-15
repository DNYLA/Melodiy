'use client';

import usePlaylists from '@/hooks/query/usePlaylist';
import useSession from '@/hooks/useSession';
// import usePlaylistStore from '@/hooks/stores/usePlaylistStore';
// import { Playlist } from '@/types/playlist';
// import { fetcher } from '@/utils/network/axios';
// import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
// import useSWR from 'swr';
import { twMerge } from 'tailwind-merge';

export interface ILibraryItem {
  name: string;
  imageUrl: string;
  redirect?: string;
}

//TODO: Conver to Server component
const LibraryItems = () => {
  const { user } = useSession();
  const { data, isLoading, error } = usePlaylists();

  const router = useRouter();
  const path = usePathname();

  if (error || isLoading) {
    // console.log(error);
    // console.log()

    return <></>;
  }

  return (
    <div className="mx-2 flex flex-col gap-y-1 overflow-hidden text-sm font-light text-inactive">
      {data &&
        data.map((playlist) => (
          <p
            key={playlist.id}
            className={twMerge(
              `... cursor-pointer truncate hover:text-white`,
              path === `/playlist/${playlist.id}` && 'text-white'
            )}
            onClick={() => router.push(`/playlist/${playlist.id}`)}
          >
            {playlist.title}
          </p>
        ))}
    </div>
  );
};

export default LibraryItems;
