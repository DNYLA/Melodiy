import { getUserSongs } from '@/app/action';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import FilesTable from '@/app/files/components/table';
import PlaylistHeader from '@/components/Data/PlaylistHeader/PlaylistHeader';
import { PlaylistType } from '@/types';
import { getDefaultImage } from '@/utils';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

export default async function Files() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) return redirect('/');
  const songs = await getUserSongs(session.user.accessToken);

  if (!songs || !songs.success) return redirect('/');

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
