'use client';

import useSession from '@/hooks/useSession';
import { AXIOS } from '@/lib/network';
import { wait } from '@/lib/utils';
import { Playlist } from '@/types';
import { useQuery } from '@tanstack/react-query';
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
  const { data, isLoading } = useQuery({
    queryKey: ['userPlaylists', user?.username],
    queryFn: async () => {
      if (!user) return undefined;
      await wait(5000);
      const { data } = await AXIOS.get<Playlist[]>('/playlist');
      return data;
    },
  });
  // const { data: session } = useSession();
  const router = useRouter();
  const path = usePathname();
  // const { setPlaylists } = usePlaylistStore();
  // const {
  //   data: playlists,
  //   isLoading,
  //   error,
  // } = useSWR<ServiceResponse<Playlist[]>>(
  //   session?.user.accessToken ? '/playlist' : null,
  //   fetcher
  // );

  // useEffect(() => {
  //   if (!playlists || !playlists.data) return;
  //   setPlaylists(playlists?.data);
  // }, [playlists, setPlaylists]);

  // if (isLoading) return <>Loading...</>;
  // if (error || !playlists?.data || !playlists?.success) {
  //   // console.log(error);
  //   // console.log()

  //   return <></>;
  // }

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
