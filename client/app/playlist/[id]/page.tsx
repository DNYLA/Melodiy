import { getPlaylist } from '@/app/action';
import React, { Suspense } from 'react';
import PlaylistTable from '@/app/playlist/[id]/components/table';
import PlaylistHeader from '@/components/Playlist/header';
import { PlaylistType } from '@/types';

export default async function Playlist({ params }: { params: { id: string } }) {
  const playlist = await getPlaylist(params.id);
  const { data } = playlist;

  // if (playlist && playlist.success == false) return <RedirectSync />;

  return (
    <Suspense fallback={<p>Loading Playlist...</p>}>
      <div className="px-2 py-3">
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
