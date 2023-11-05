import { getArtistInfo } from '@/app/action';
import { redirect } from 'next/navigation';
import AlbumList from './components/AlbumList';
import ArtistHeader from './components/ArtistHeader';
import TopTracks from './components/TopTracks';

export default async function Artist({ params }: { params: { id: string } }) {
  const artist = await getArtistInfo(params.id);
  if (artist && !artist.success) return redirect('/');

  const { data } = artist;

  return (
    <div className="">
      <ArtistHeader
        name={data.name}
        coverUrl={data.coverPath}
        listerners={data.monthlyListeners}
      />
      <div className="z-50 m-5 flex flex-col gap-y-4 px-5">
        <TopTracks songs={data.topTracks} />
        {data.albums.length > 0 && (
          <AlbumList header="Albums" albums={data.albums} />
        )}
        {data.singles.length > 0 && (
          <AlbumList header={'Singles & EPs'} albums={data.singles} />
        )}
      </div>
    </div>
  );
}
