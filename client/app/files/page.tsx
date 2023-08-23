import { getUserSongs } from '@/app/action';
import React, { Suspense } from 'react';
import PlaylistTable from '@/components/Tables/table';
import RedirectSync from '@/components/RedirectSync';
import PlaylistHeader from '@/components/Playlist/header';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { PlaylistType } from '@/types';

export default async function Files() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) return null;
  const songs = await getUserSongs(session.user.accessToken);

  if (!songs || !songs.success)
    return <RedirectSync message="Server unavailable" />;

  const { data } = songs;
  if (!data) return <></>;

  return (
    <Suspense fallback={<p>Loading Playlist...</p>}>
      <div className="px-2 py-3">
        <PlaylistHeader
          data={{
            uid: '@me',
            title: 'Your Files',
            imagePath: 'images/default_playlist.png',
            user: { id: session.user.id, username: session.user.username },
            createdAt: new Date().toISOString(),
            tracks: [],
          }}
        />
        <PlaylistTable data={data} type={PlaylistType.Files} />
      </div>
    </Suspense>
  );
}
