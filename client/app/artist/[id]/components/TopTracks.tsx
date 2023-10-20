'use client';

import { ColumnBuilder } from '@/components/Data/Tables/ColumnBuilder';
import SongTable from '@/components/Data/Tables/Song/SongTable';
import { PlaylistType } from '@/types';
import { Provider } from '@/types/playlist';

export interface ITopTracks {}

const TopTracks: React.FC<ITopTracks> = () => {
  const columns = new ColumnBuilder()
    .AddTitle(() => false)
    .AddAlbum()
    .AddDuration()
    .Build();

  return (
    <div className="">
      <div className="mb-1 flex items-center justify-between align-middle">
        <h1 className="text-xl font-bold">Top Tracks</h1>
        <span className="cursor-pointer text-center align-middle text-sm font-light uppercase transition-all delay-100 ease-in-out hover:opacity-80">
          View All
        </span>
      </div>
      <SongTable
        data={[
          {
            uid: '-1',
            title: 'The Box',
            artist: 'Roddy Ricch',
            album: 'Please Excuse Me For Being Antisocial',
            albumArtist: 'Roddy Ricch',
            coverPath:
              'https://i.scdn.co/image/ab67616d0000b273600adbc750285ea1a8da249f',
            songPath: 'invalid',
            duration: 2555,
            createdAt: new Date().toString(),
            releaseDate: new Date().toString(),
            provider: Provider.External,
          },
          {
            uid: '-1',
            title: 'Down Below',
            artist: 'Roddy Ricch',
            album: 'Feed tha streets II',
            albumArtist: 'Roddy Ricch',
            coverPath:
              'https://i.scdn.co/image/ab67616d0000b273434f4eeb4231f6f4862cafd4',
            songPath: 'invalid',
            duration: 2555,
            createdAt: new Date().toString(),
            releaseDate: new Date().toString(),
            provider: Provider.External,
          },
          {
            uid: '-1',
            title: 'Letter To My Son',
            artist: 'Roddy Ricch',
            album: 'Feed tha streets III',
            albumArtist: 'Roddy Ricch',
            coverPath:
              'https://i.scdn.co/image/ab67616d0000b273d513f31f1445121235424acb',
            songPath: 'invalid',
            duration: 2555,
            createdAt: new Date().toString(),
            releaseDate: new Date().toString(),
            provider: Provider.External,
          },
          {
            uid: '-1',
            title: 'Prayers to the Trap God',
            artist: 'Roddy Ricch',
            album: 'Please Excuse Me For Being Antisocial',
            albumArtist: 'Roddy Ricch',
            coverPath:
              'https://i.scdn.co/image/ab67616d0000b273600adbc750285ea1a8da249f',
            songPath: 'invalid',
            duration: 2555,
            createdAt: new Date().toString(),
            releaseDate: new Date().toString(),
            provider: Provider.External,
          },
          {
            uid: '-1',
            title: 'Thugs Cry',
            artist: 'Roddy Ricch',
            album: 'Unreleased',
            albumArtist: 'Roddy Ricch',
            coverPath:
              'https://svmigokmzkjddcixdmzh.supabase.co/storage/v1/object/public/images/Jungaal/29f4c3934d9e482207a43c3748f60983.png',
            songPath: 'invalid',
            duration: 2555,
            createdAt: new Date().toString(),
            releaseDate: new Date().toString(),
            provider: Provider.External,
          },
        ]}
        columns={columns}
        type={PlaylistType.Playlist}
      />
    </div>
  );
};

export default TopTracks;
