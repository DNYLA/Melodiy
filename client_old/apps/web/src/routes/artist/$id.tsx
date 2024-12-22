import { fetchArtist } from '@melodiy/api';
import { TopTracksTable } from '@melodiy/ui/collections';
import {
  CollectionCard,
  CollectionCardSize,
} from '@melodiy/ui/components/Cards';
import * as Tabs from '@radix-ui/react-tabs';
import { Await, createFileRoute, defer } from '@tanstack/react-router';
import { Suspense } from 'react';
import { FaSpinner } from 'react-icons/fa';
import { ArtistHeader } from './-components/ArtistHeader';

function Artist() {
  const navigate = Route.useNavigate();
  const data = Route.useLoaderData();

  return (
    <div className="flex flex-col w-full">
      <Suspense
        fallback={
          <ArtistHeader
            id={''}
            name={<FaSpinner size={23} className="mb-2 animate-spin" />}
            listerners={0}
          />
        }
      >
        <Await promise={data.artist}>
          {(artist) => {
            if (artist === undefined) {
              navigate({ to: '/' });
              return;
            }

            return (
              <>
                <ArtistHeader
                  id={artist.id}
                  name={artist.name}
                  imageSrc={artist.image}
                  listerners={artist.monthlyListeners}
                />
                <div className="">
                  <Tabs.Root className="flex flex-col" defaultValue="home">
                    <Tabs.List className="sticky top-0 z-50 flex w-full p-5 border-b rounded-lg gap-x-8 bg-background border-base">
                      <Tabs.Trigger
                        className="data-[state=active]:border-b pb-2 border-primary hover:border-b"
                        value="home"
                      >
                        Home
                      </Tabs.Trigger>
                      <Tabs.Trigger
                        className="data-[state=active]:border-b pb-2 border-primary hover:border-b"
                        value="singles"
                      >
                        Singles and EPs
                      </Tabs.Trigger>
                      <Tabs.Trigger
                        className="data-[state=active]:border-b pb-2 border-primary hover:border-b"
                        value="albums"
                      >
                        Albums
                      </Tabs.Trigger>

                      {artist.userAlbums && artist.userAlbums.length > 0 && (
                        <Tabs.Trigger
                          className="data-[state=active]:border-b pb-2 border-primary hover:border-b"
                          value="compilations"
                        >
                          Compilations
                        </Tabs.Trigger>
                      )}

                      <Tabs.Trigger
                        className="data-[state=active]:border-b pb-2 border-primary hover:border-b"
                        value="about"
                      >
                        About
                      </Tabs.Trigger>
                    </Tabs.List>

                    <Tabs.Content className="w-full" value="home">
                      <div className="flex flex-col px-5 gap-y-4">
                        <TopTracksTable tracks={artist.topTracks} />
                        <TopTracksTable tracks={artist.topTracks} />
                        <TopTracksTable tracks={artist.topTracks} />
                        <TopTracksTable tracks={artist.topTracks} />
                        <TopTracksTable tracks={artist.topTracks} />
                      </div>
                    </Tabs.Content>
                    <Tabs.Content className="w-full m-5" value="singles">
                      <div className="flex flex-wrap pb-3 bg-center gap-y-5 gap-x-5">
                        {artist.singles.length > 0 &&
                          artist.singles.map((album) => (
                            <CollectionCard
                              id={album.id}
                              key={album.id}
                              title={album.title}
                              artists={album.artists}
                              imageSrc={album.image}
                              size={CollectionCardSize.Large}
                            />
                          ))}
                      </div>
                    </Tabs.Content>

                    <Tabs.Content className="w-full m-5" value="albums">
                      <div className="flex flex-wrap pb-3 bg-center gap-y-5 gap-x-5">
                        {artist.albums.length > 0 &&
                          artist.albums.map((album) => (
                            <CollectionCard
                              id={album.id}
                              key={album.id}
                              title={album.title}
                              artists={album.artists}
                              imageSrc={album.image}
                              size={CollectionCardSize.Large}
                            />
                          ))}
                      </div>
                    </Tabs.Content>

                    <Tabs.Content className="w-full m-5" value="compilations">
                      <div className="flex flex-wrap pb-3 bg-center gap-y-5 gap-x-5">
                        {artist.userAlbums.length > 0 &&
                          artist.userAlbums.map((album) => (
                            <CollectionCard
                              id={album.id}
                              key={album.id}
                              title={album.title}
                              artists={album.artists}
                              imageSrc={album.image}
                              size={CollectionCardSize.Large}
                            />
                          ))}
                      </div>
                    </Tabs.Content>
                  </Tabs.Root>
                </div>
              </>
            );
          }}
        </Await>
      </Suspense>
    </div>
  );
}

export const Route = createFileRoute('/artist/$id')({
  loader: ({ params }) => {
    return { artist: defer(fetchArtist(params.id)) };
  },
  component: Artist,
});
