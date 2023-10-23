import { getPlaylist } from '@/app/action';
import PlaylistTable from '@/app/playlist/[id]/components/table';
import PlaylistHeader from '@/components/Data/TableHeader/TableHeader';
import { PlaylistType } from '@/types';
import { redirect } from 'next/navigation';

export default async function Playlist({ params }: { params: { id: string } }) {
  const playlist = await getPlaylist(params.id);
  const { data } = playlist;

  if (playlist && playlist.success == false) return redirect('/');

  return (
    <div className="px-6 py-3 pr-5 pt-2">
      {data && (
        <>
          <PlaylistHeader
            title={data.title}
            releaseDate={new Date(data.createdAt)}
            tracks={data.tracks}
            owner={playlist.data.user.username}
            type={PlaylistType.Playlist}
            coverPath={data.imagePath}
          />
          <PlaylistTable data={data.tracks} type={PlaylistType.Playlist} />
        </>
      )}
    </div>
  );
}
