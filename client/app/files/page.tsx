import { getUserSongs } from '@/app/action';
import React, { Suspense } from 'react';
import RedirectSync from '@/components/RedirectSync';
import PlaylistHeader from '@/components/Playlist/header';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { PlaylistType } from '@/types';
import { getDefaultImage } from '@/utils';
import FilesTable from '@/app/files/components/table';

export default async function Files() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user)
    return <RedirectSync message="Server unavailable" />;
  const songs = await getUserSongs(session.user.accessToken);

  if (!songs || !songs.success)
    return <RedirectSync message="Server unavailable" />;

  return (
    <Suspense fallback={<p>Loading Playlist...</p>}>
      <div className="px-2 py-3">
        <PlaylistHeader
          data={{
            uid: '@me',
            title: 'Your Files',
            imagePath: getDefaultImage(),
            user: { id: session.user.id, username: session.user.username },
            createdAt: new Date().toISOString(),
            tracks: [],
          }}
        />
        <FilesTable data={songs.data} type={PlaylistType.Files} />
      </div>
    </Suspense>
  );
}
