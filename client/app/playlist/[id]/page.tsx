import { getPlaylist } from '@/app/action';
import PlaylistTable from '@/app/playlist/[id]/components/table';
import PlaylistHeader from '@/components/Data/PlaylistHeader/PlaylistHeader';
import { PlaylistType } from '@/types';
import { Suspense } from 'react';

export default async function Playlist({ params }: { params: { id: string } }) {
  const playlist = await getPlaylist(params.id);
  const { data } = playlist;

  // if (playlist && playlist.success == false) return redirect('/');

  return (
    <Suspense fallback={<p>Loading Playlist...</p>}>
      <div className="px-6 py-3 pr-5 pt-2">
        {data && (
          <>
            <PlaylistHeader data={data} />
            <PlaylistTable data={data.tracks} type={PlaylistType.Playlist} />
          </>
        )}
      </div>
    </Suspense>
  );
}
