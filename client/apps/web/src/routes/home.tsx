import { Await, useLoaderData } from '@melodiy/router';
import { CollectionCardSize, PlaylistCard } from '@melodiy/ui/components/Cards';
import { Suspense } from 'react';

export default function Homepage() {
  const data = useLoaderData({ from: '/' });

  return (
    <main className="p-3 pb-4 base-container gap-x-1">
      <Suspense
        fallback={
          <div className="flex">
            <img src="/logo.png" className="items-center w-10 text-center" />
            <p>Home Page (WIP)</p>
          </div>
        }
      >
        <Await promise={data.feed}>
          {(feed) => {
            return (
              <div className="flex flex-col gap-y-2">
                <div className="flex items-center gap-x-2">
                  <img
                    src="/logo.png"
                    className="items-center w-10 text-center"
                  />
                  <p>Home (WIP)</p>
                </div>

                <div className="flex flex-col gap-y-2">
                  <span className="text-xl font-bold">Playlists</span>
                  <div className="flex flex-wrap pb-3 bg-center gap-y-5 gap-x-5">
                    {feed.playlists.length > 0 &&
                      feed.playlists.map((playlist) => (
                        <PlaylistCard
                          id={playlist.id}
                          key={playlist.id}
                          title={playlist.title}
                          imageSrc={playlist.image}
                          owner={playlist.user}
                          size={CollectionCardSize.Medium}
                        />
                      ))}
                  </div>
                </div>
              </div>
            );
          }}
        </Await>
      </Suspense>
    </main>
  );
}
