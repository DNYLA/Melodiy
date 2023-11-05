import searchQuery from '@/actions/searchQuery';
import SearchTable from '@/app/search/components/SearchTable';
import TopResult from '@/app/search/components/TopResult';
import ArtistCard from '@/components/Cards/Artist/ArtistCard';

interface SearchProps {
  searchParams: {
    title: string;
  };
}

export const revalidate = 0;

const Search = async ({ searchParams }: SearchProps) => {
  // const songs = await getSongsByTitle(searchParams.title);
  console.log('Loading Search ' + searchParams.title);
  const result = await searchQuery(searchParams.title);
  console.log('Loaded Search');
  // if (!result || (result.songs.length === 0 && result.artists.length === 0))
  //   return (
  //     <div className="relative left-5 right-0 w-full items-center gap-y-2 self-center px-6 pr-5 pt-2 text-center align-middle font-bold">
  //       <p className="text-xl">
  //         No results found for <q>{searchParams.title}</q>
  //       </p>
  //       <span className="text-lg">
  //         Make sure you spelled everything correctly or use a different search
  //         term.
  //       </span>
  //     </div>
  //   );

  return (
    <div className="grid grid-cols-3 p-2">
      <div className="col-span-1">
        <span className="text-lg font-bold">Top Result</span>
        <div className="mt-3">
          <TopResult song={result.songs[0]} />
        </div>
      </div>
      <div className="col-span-2">
        <SearchTable songs={result.songs} />
      </div>

      <div className="col-span-3 mt-2">
        <span className="text-lg font-bold">Artists</span>
        <div className="flex gap-x-1 overflow-x-auto">
          {result.artists.slice(0, 8).map((artist) => (
            <ArtistCard
              name={artist.name}
              imageUrl={artist.coverPath ?? '/images/default_playlist.png'}
              redirect={`/artist/${artist.uid}`}
              key={artist.uid}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
