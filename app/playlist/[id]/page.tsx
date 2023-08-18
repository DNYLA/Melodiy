import { getPlaylist } from '@/app/action';
import RedirectSync from './components/RedirectSync';
import React, { Suspense } from 'react';
import PlaylistHeader from './components/header';
import PlaylistTable from '@/app/playlist/[id]/components/Playlist';

export default async function Playlist({ params }: { params: { id: string } }) {
  const playlist = await getPlaylist(params.id);
  const { data } = playlist;

  if (playlist && playlist.success == false) return <RedirectSync />;
  if (!data) return <></>;

  return (
    <div className="px-2 py-3">
      <Suspense fallback={<p>Loading Playlist...</p>}>
        <PlaylistHeader data={data} />
      </Suspense>
      <PlaylistTable />
    </div>
  );
}
