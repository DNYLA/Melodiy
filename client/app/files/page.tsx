import { getUserSongs } from '@/app/action';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import FilesTable from '@/app/files/components/table';
import PlaylistHeader from '@/components/Data/TableHeader/TableHeader';
import { PlaylistType } from '@/types';
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
      <div className="px-6 py-3 pr-5 pt-2">
        <PlaylistHeader
          data={{
            uid: '@me',
            title: 'Your Files',
            imagePath: undefined,
            user: { id: session.user.id, username: session.user.username },
            createdAt: new Date().toISOString(),
            tracks: songs.data,
          }}
        />
        <FilesTable data={songs.data} type={PlaylistType.Files} />
      </div>
    </Suspense>
  );
}
