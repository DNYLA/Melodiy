import { searchQeury } from '@melodiy/api';
import { SearchTable } from '@melodiy/collections';
import { AlbumCard, ArtistCard } from '@melodiy/shared-ui';
import { Await, createFileRoute, defer } from '@tanstack/react-router';
import { Suspense } from 'react';
import { z } from 'zod';

const searchSchema = z.object({
  title: z.string().catch(''),
});

function Search() {
  const results = Route.useLoaderData();

  return (
    <Suspense
      fallback={
        <div className="base-container p-2 pb-4 pt-8 mt-9">Loading...</div>
      }
    >
      <Await promise={results.results}>
        {(result) => {
          return (
            <div className="base-container p-2 pb-4 pt-8">
              <div className="mt-9">
                <SearchTable data={result.tracks} />
              </div>

              <div className="mt-6">
                <span className="text-lg font-bold">Artists</span>
                <div className="flex gap-x-6 overflow-x-auto">
                  {result.artists.slice(0, 8).map((artist) => (
                    <ArtistCard
                      id={artist.id}
                      name={artist.name}
                      imageSrc={artist.image}
                      key={artist.id}
                    />
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <span className="text-lg font-bold">Albums</span>
                <div className="flex gap-x-4 overflow-x-auto py-4 pl-1">
                  {result.albums.slice(0, 8).map((album) => (
                    <AlbumCard
                      id={album.id}
                      title={album.title}
                      artists={album.artists}
                      imageSrc={album.image}
                      key={album.id}
                    />
                  ))}
                </div>
              </div>
            </div>
          );
        }}
      </Await>
    </Suspense>
  );
}

export const Route = createFileRoute('/search')({
  validateSearch: (search) => searchSchema.parse(search),
  loaderDeps: ({ search: { title } }) => ({ title }),
  loader: async ({ deps: { title } }) => {
    const tracks = searchQeury(title);

    return { results: defer(tracks) };
  },
  component: Search,
});
