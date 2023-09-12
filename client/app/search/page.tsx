import searchQuery from '@/actions/searchQuery';
import SearchTable from '@/app/search/components/SearchTable';
import TopResult from '@/app/search/components/TopResult';

interface SearchProps {
  searchParams: {
    title: string;
  };
}

export const revalidate = 0;

const Search = async ({ searchParams }: SearchProps) => {
  // const songs = await getSongsByTitle(searchParams.title);
  const result = await searchQuery(searchParams.title);

  if (!result || !result.songs || result.songs.length === 0)
    return (
      <div className="relative left-5 right-0 w-full items-center gap-y-2 self-center text-center align-middle font-bold">
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
    <div className="grid grid-cols-3">
      <div className="col-span-1">
        <span className="text-lg font-bold">Top Result</span>
        <div className="mt-3">
          {result && result.songs && result.songs.length > 0 && (
            <TopResult song={result.songs[0]} />
          )}
        </div>
      </div>
      <div className="col-span-2">
        <SearchTable songs={result.songs} />
      </div>
    </div>
  );
};

export default Search;
