import { SearchQuery } from '@melodiy/api';
import { SearchTable } from '@melodiy/collections';
import { AlbumCard, ArtistCard } from '@melodiy/shared-ui';
import { SearchType } from '@melodiy/types';
import { Await, createFileRoute, defer } from '@tanstack/react-router';
import { Suspense } from 'react';
import { FaSpinner } from 'react-icons/fa';
import { z } from 'zod';

const searchSchema = z.object({
  title: z.string().catch(''),
});

function Search() {
  const { title } = Route.useSearch();
  const results = Route.useLoaderData();

  //TODO: Move Loading & NoResults to seperate file
  return (
    <Suspense
      fallback={
        <div className="absolute translate-y-1/2 top-50 left-0.5 right-0 w-full items-center gap-y-2 gap-x-0 self-center px-6 pr-5 pt-2 text-center align-middle font-bold h-full">
          <FaSpinner size={23} className="animate-spin w-full" />
        </div>
      }
    >
      <Await promise={results.results}>
        {(result) => {
          if (
            !result ||
            (result.tracks.length === 0 &&
              result.artists.length === 0 &&
              result.albums.length === 0)
          )
            return (
              <div className="absolute translate-y-1/2 top-50 left-0.5 right-0 w-full items-center gap-y-2 self-center px-6 pr-5 pt-2 text-center align-middle font-bold h-full">
                <p className="text-xl">
                  No results found for <q>{title}</q>
                </p>
                <span className="text-lg">
                  Make sure you spelled everything correctly or use a different
                  search term.
                </span>
              </div>
            );

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
    const tracks = SearchQuery(title, SearchType.All);
    return { results: defer(tracks) };
  },
  component: Search,
});
