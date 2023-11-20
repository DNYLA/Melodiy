'use client';
import Recents from '@/app/(site)/components/Recents';
import ComboBox from '@/components/Inputs/ComboBox';
import MultiSelect from '@/components/Inputs/Selects/MultiSelect';
import useArtistSearch from '@/hooks/query/useArtistSearch';

export default function Home() {
  const { query, term, setTerm, loading } = useArtistSearch();

  return (
    <main className="base-container flex h-full w-full flex-col gap-y-5">
      <Recents />
      <div>
        <MultiSelect />
      </div>
      <div>
        <ComboBox
          data={query.data}
          loading={loading}
          term={term}
          setTerm={setTerm}
          placeholder="Artist"
          id="artist"
        />
      </div>
    </main>
  );
}
