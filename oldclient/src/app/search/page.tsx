import { searchQeury } from '@/actions';
import AlbumCard from '@/components/Cards/Album';
import ArtistCard from '@/components/Cards/Artist';
import { getDefaultImage } from '@/lib/utils';
import { Suspense } from 'react';
import SearchTable from './table';

interface SearchProps {
  searchParams: {
    title: string;
  };
}

export const revalidate = 0;

const Search = async ({ searchParams }: SearchProps) => {
  // const songs = await getSongsByTitle(searchParams.title);
  const result = await searchQeury(searchParams.title);
  if (
    !result ||
    (result.tracks.length === 0 &&
      result.artists.length === 0 &&
      result.albums.length === 0)
  )
    return (
      <div className="relative left-5 right-0 w-full items-center gap-y-2 self-center px-6 pr-5 pt-2 text-center align-middle font-bold">
        <p className="text-xl">
          No results found for <q>{searchParams.title}</q>
        </p>
        <span className="text-lg">
          Make sure you spelled everything correctly or use a different search
          term.
        </span>
      </div>
    );

  return (
    <Suspense key={searchParams.title} fallback={<div>Loading...</div>}>
      <div className="base-container p-2 pb-4 pt-8">
        {/* <div className="col-span-1">
        <span className="text-lg font-bold">Top Result</span>
        <div className="mt-3">
          <TopResult song={result.songs[0]} />
        </div>
      </div>
      <div className="col-span-2">
        <SearchTable songs={result.songs} />
      </div> */}

        <div className="mt-9">
          {/* <span className="text-lg font-bold">Tracks</span> */}
          <SearchTable data={result.tracks} />
        </div>

        <div className="mt-6">
          <span className="text-lg font-bold">Artists</span>
          <div className="flex gap-x-6 overflow-x-auto">
            {result.artists.slice(0, 8).map((artist) => (
              <ArtistCard
                name={artist.name}
                imageUrl={artist.image ?? getDefaultImage()}
                redirect={`/artist/${artist.id}`}
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
                title={album.title}
                artists={album.artists}
                imageUrl={album.image ?? getDefaultImage()}
                redirect={`/album/${album.id}`}
                key={album.id}
              />
            ))}
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default Search;
