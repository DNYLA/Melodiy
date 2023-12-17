import { getArtist } from '@/actions';
import CollectionList from '@/components/Data/CollectionList/CollectionList';
import { redirect } from 'next/navigation';
import { ArtistHeader } from './components/ArtistHeader';
import TopTracksTable from './components/TopTracksTable';

export default async function Artist({ params }: { params: { id: string } }) {
  const artist = await getArtist(params.id);
  if (!artist) return redirect('/');

  return (
    <main className="flex w-full flex-col gap-y-5">
      <ArtistHeader
        id={artist.id}
        name={artist.name}
        imageUrl={artist.image}
        listerners={artist.monthlyListeners}
      />

      <div className="m-5 flex flex-col gap-y-4 px-5">
        <TopTracksTable tracks={artist.topTracks} />
        {artist.albums.length > 0 && (
          <CollectionList header="Albums" albums={artist.albums} />
        )}
        {artist.singles.length > 0 && (
          <CollectionList header={'Singles & EPs'} albums={artist.singles} />
        )}
        {artist.userAlbums.length > 0 && (
          <CollectionList
            header={'Unofficial Albums'}
            albums={artist.userAlbums}
          />
        )}
      </div>
    </main>
  );
}
