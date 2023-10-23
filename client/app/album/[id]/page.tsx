import { getAlbum } from '@/app/action';
import TableHeader from '@/components/Data/TableHeader/TableHeader';
import { PlaylistType } from '@/types';
import { redirect } from 'next/navigation';
import AlbumTable from './components/table';

export default async function Album({ params }: { params: { id: string } }) {
  const album = await getAlbum(params.id);
  const { data } = album;

  if (album && album.success == false) return redirect('/');

  return (
    <div className="px-6 py-3 pr-5 pt-2">
      {data && (
        <>
          <TableHeader
            title={data.name}
            releaseDate={data.releaseDate}
            tracks={data.tracks}
            owner={data.artists[0].name}
            type={PlaylistType.Album}
            coverPath={data.coverPath}
            redirect={`/artist/${data.artists[0].uid}`}
          />
          <AlbumTable data={data.tracks} />
        </>
      )}
    </div>
  );
}
