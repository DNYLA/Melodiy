import { fetchArtist } from '@melodiy/api';
import { TopTracksTable, CollectionList } from '@melodiy/ui/collections';
import { Await, createFileRoute, defer } from '@tanstack/react-router';
import { Suspense } from 'react';
import { FaSpinner } from 'react-icons/fa';
import { ArtistHeader } from './-components/ArtistHeader';

function Artist() {
  const navigate = Route.useNavigate();
  const data = Route.useLoaderData();

  return (
    <main className="flex flex-col w-full gap-y-5">
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

                <div className="flex flex-col px-5 m-5 gap-y-4">
                  <TopTracksTable tracks={artist.topTracks} />
                  <TopTracksTable tracks={artist.topTracks} />
                  <TopTracksTable tracks={artist.topTracks} />
                  <TopTracksTable tracks={artist.topTracks} />
                  <TopTracksTable tracks={artist.topTracks} />
                  {artist.albums.length > 0 && (
                    <CollectionList header="Albums" albums={artist.albums} />
                  )}
                  {artist.singles.length > 0 && (
                    <CollectionList
                      header={'Singles & EPs'}
                      albums={artist.singles}
                    />
                  )}
                  {artist.userAlbums.length > 0 && (
                    <CollectionList
                      header={'Unofficial Albums'}
                      albums={artist.userAlbums}
                    />
                  )}
                </div>
              </>
            );
          }}
        </Await>
      </Suspense>
    </main>
  );
}

export const Route = createFileRoute('/artist/$id')({
  loader: ({ params }) => {
    return { artist: defer(fetchArtist(params.id)) };
  },
  component: Artist,
});
