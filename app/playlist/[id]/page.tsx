import { getPlaylist } from '@/app/action';
import RedirectSync from '../../../components/RedirectSync';
import React, { Suspense } from 'react';
import PlaylistTable from '@/app/playlist/[id]/components/Playlist';
import PlaylistHeader from '@/components/Playlist/header';
import { Song } from '@/types/playlist';

export default async function Playlist({ params }: { params: { id: string } }) {
  const playlist = await getPlaylist(params.id);
  const { data } = playlist;

  if (playlist && playlist.success == false) return <RedirectSync />;

  return (
    <div className="px-2 py-3">
      <Suspense fallback={<p>Loading Playlist...</p>}>
        {data && (
          <>
            <PlaylistHeader data={data} />
            <PlaylistTable data={data.tracks} />
          </>
        )}
      </Suspense>
    </div>
  );
}
