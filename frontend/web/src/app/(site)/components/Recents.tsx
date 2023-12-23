'use client';

import PlaylistList from '@/components/Data/PlaylistList';
import usePlaylists from '@/hooks/query/usePlaylist';

export default function Trending() {
  // const trending = await getTrending();

  // if (trending && !trending.success) {
  //   return <p className="text-3xl font-bold ">Trending</p>;
  // }

  const { data } = usePlaylists();

  return (
    <div>
      <p className="mb-5 text-3xl font-bold">Your Playlists</p>
      {data && data.length > 0 && <PlaylistList playlists={data} />}
    </div>
  );

  // return (
  //   <div className="">
  //     <Suspense fallback={<p>Loading..</p>}>
  //       <p className="text-3xl font-bold ">Recently Created</p>
  //       <div className="mt-3 flex flex-row gap-x-5 overflow-x-auto overflow-y-hidden p-3">
  //         {trending.data.map((playlist) => (
  //           <PlaylistCard
  //             key={playlist.uid}
  //             redirect={`/playlist/${playlist.uid}`}
  //             title={playlist.title}
  //             imageUrl={playlist.imagePath}
  //             owner={playlist.user.username}
  //           />
  //         ))}
  //       </div>
  //     </Suspense>
  //   </div>
  // );
}
