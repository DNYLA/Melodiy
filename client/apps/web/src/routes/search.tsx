import { useLoaderData, useSearch } from '@melodiy/router';
import { SearchTable } from '@melodiy/ui/collections';
import { AlbumCard, ArtistCard } from '@melodiy/ui/components/Cards';
import { Await } from '@melodiy/router';
import { Suspense } from 'react';
import { FaSpinner } from 'react-icons/fa';

export default function Search() {
  const { title } = useSearch({ from: '/search' });
  const data = useLoaderData({ from: '/search' });

  //TODO: Move Loading & NoResults to seperate file
  return (
    <Suspense
      fallback={
        <div className="flex flex-col items-center justify-center w-full h-full font-bold">
          <FaSpinner size={23} className="w-full animate-spin" />
        </div>
      }
    >
      <Await promise={data.results}>
        {(result) => {
          if (
            !result ||
            !result.tracks ||
            (result.tracks?.length === 0 &&
              result.artists?.length === 0 &&
              result.albums?.length === 0)
          )
            return (
              <div className="flex flex-col items-center self-center justify-center w-full h-full font-bold gap-y-2">
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
            <div className="p-2 pt-4 pb-4 base-container">
              <div>
                <SearchTable data={result.tracks} />
              </div>

              <div className="mt-6 ml-3">
                <span className="text-lg font-bold">Artists</span>
                <div className="flex overflow-x-auto gap-x-6">
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

              <div className="mt-6 ml-3">
                <span className="text-lg font-bold">Albums</span>
                <div className="flex py-4 pl-1 overflow-x-auto gap-x-4">
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
