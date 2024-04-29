import { fetchArtist } from '@melodiy/api';
import { TopTracksTable } from '@melodiy/collections';
import { Await, createFileRoute, defer } from '@tanstack/react-router';
import { ArtistHeader } from './-components/ArtistHeader';
import { CollectionList } from '@melodiy/shared-ui';
import { Suspense } from 'react';
import { FaSpinner } from 'react-icons/fa';

function Artist() {
  const navigate = Route.useNavigate();
  const data = Route.useLoaderData();

  return (
    <main className="flex w-full flex-col gap-y-5">
      <Suspense
        fallback={
          <ArtistHeader
            id={''}
            name={<FaSpinner size={23} className="animate-spin mb-2" />}
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

                <div className="m-5 flex flex-col gap-y-4 px-5">
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
