import { getTrending } from '@/app/action';
import PlaylistCard from '@/components/Cards/playlist-card';
import { Suspense } from 'react';

export default async function Trending() {
  const trending = await getTrending();

  if (trending && !trending.success) {
    return <p className="text-3xl font-bold ">Trending</p>;
  }

  return (
    <div className="">
      <Suspense fallback={<p>Loading..</p>}>
        <p className="text-3xl font-bold ">Recently Created</p>
        <div className="flex flex-row mt-3 gap-x-5 overflow-x-auto overflow-y-hidden p-3">
          {trending.data.map((playlist) => (
            <PlaylistCard
              key={playlist.uid}
              uid={playlist.uid}
              title={playlist.title}
              imageUrl={playlist.imagePath}
              owner={playlist.user.username}
            />
          ))}
        </div>
      </Suspense>
    </div>
  );
}
