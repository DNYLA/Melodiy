import { getPlaylist, getUserSongs } from '@/app/action';
import React, { Suspense } from 'react';
import PlaylistTable from '@/app/playlist/[id]/components/Playlist';
import RedirectSync from '@/components/RedirectSync';
import PlaylistHeader from '@/components/Playlist/header';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export default async function Files() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) return null;
  const songs = await getUserSongs(session.user.accessToken);

  if (!songs || !songs.success) return <RedirectSync />;

  const { data } = songs;
  if (!data) return <></>;

  return (
    <div className="px-2 py-3">
      <Suspense fallback={<p>Loading Playlist...</p>}>
        <PlaylistHeader
          data={{
            id: -1,
            shareId: '@me',
            title: 'Your Files',
            imagePath: 'images/default_playlist.png',
            user: { id: session.user.id, username: session.user.username },
          }}
        />
        <PlaylistTable data={data} />
      </Suspense>
    </div>
  );
}
