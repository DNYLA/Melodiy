import { getPlaylist } from '@/app/action';
import RedirectSync from './components/RedirectSync';
import React from 'react';
import PlaylistHeader from './components/header';

export default async function Playlist({ params }: { params: { id: string } }) {
  const playlist = await getPlaylist(params.id);

  //Probably a betterr way to handle all of this.
  const { data } = playlist;
  if (playlist && playlist.success == false) return <RedirectSync />;
  if (!data) return <></>;

  return (
    <div className="px-2 py-3">
      <PlaylistHeader data={data} />
    </div>
  );
}
