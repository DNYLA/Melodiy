import { getPlaylist } from '@/app/action';
import RedirectSync from '../../../components/RedirectSync';
import React, { Suspense } from 'react';
import PlaylistTable from '@/app/playlist/[id]/components/Playlist';
import PlaylistHeader from '@/components/Playlist/header';
import { Song } from '@/types/playlist';

export default async function Playlist({ params }: { params: { id: string } }) {
  const playlist = await getPlaylist(params.id);
  const { data } = playlist;

  const playlistSongs: Song[] = [
    {
      uid: '1',
      title: 'Drive By',
      artist: 'Fivio Foreign',
      album: '800 BC',
      createdAt: '2023-04-21T17:23:19Z',
      duration: 52,
      coverPath:
        'https://i.scdn.co/image/ab67616d00004851d5d1cc65dfc6163a8bcfaf80',
      songPath: '',
    },
    {
      uid: '2',
      title: 'REAL RECOGNIZE REAL (feat. Roddy Ricch)',
      artist: 'Doe Boy',
      album: 'OH REALLY',
      createdAt: '2023-04-22T20:50:09Z',
      duration: 229,
      songPath: '',
      coverPath:
        'https://i.scdn.co/image/ab67616d00004851403dc62551c138ce173f1680',
    },
    {
      uid: '3',
      title: 'Feds Duid a Sweep',
      artist: 'Future',
      album: 'FUTURE',
      createdAt: '2023-02-14T01:00:30Z',
      duration: 13,
      songPath: '',
      coverPath:
        'https://i.scdn.co/image/ab67616d00004851e0b64c8be3c4e804abcb2696',
    },
    {
      uid: '4',
      title: 'Mask Off',
      artist: 'Future',
      album: 'FUTURE',
      createdAt: '2022-11-15T18:57:26Z',
      duration: 205,
      songPath: '',
      coverPath:
        'https://i.scdn.co/image/ab67616d00004851e0b64c8be3c4e804abcb2696',
    },
    {
      uid: '5',
      title: 'PUFFIN ON ZOOTIES',
      artist: 'Future',
      album: 'I NEVER LIKED YOU',
      createdAt: '2022-12-13T13:42:25Z',
      duration: 194,
      songPath: '',
      coverPath:
        'https://i.scdn.co/image/ab67616d0000485186badd635b69aea887862214',
    },
    {
      uid: '6',
      title: '90210 (feat.Kacy Hill)',
      artist: 'Travis Scott',
      album: 'Rodeo',
      createdAt: '2023-08-16T03:23:16Z',
      duration: 156,
      songPath: '',
      coverPath:
        'https://i.scdn.co/image/ab67616d00004851715973050587fe3c93033aad',
    },
    {
      uid: '7',
      title: 'Big Homie',
      artist: 'OMB Peezy',
      album: 'Big Homie',
      createdAt: '2023-02-24T06:09:13Z',
      duration: 236,
      songPath: '',
      coverPath:
        'https://i.scdn.co/image/ab67616d00004851cbd457992f9dd297a8db9c43',
    },
    {
      uid: '8',
      title: 'Still Waiting - Bonus',
      artist: 'YoungBoy Never Broke Again',
      album: 'Sincerely, Kentrell',
      createdAt: '2022-12-05T22:11:15Z',
      duration: 4,
      songPath: '',
      coverPath:
        'https://i.scdn.co/image/ab67616d000048514fc2bc1fbb295ceabbf5a658',
    },
    {
      uid: '9',
      title: 'Intro',
      artist: 'Loski',
      album: 'Call Me Loose',
      songPath: '',
      createdAt: '2023-03-12T23:10:43Z',
      duration: 172,
      coverPath:
        'https://i.scdn.co/image/ab67616d000048517aa49555f34dc992128baf93',
    },
    {
      uid: '10',
      title: 'Prayers to the Trap God',
      artist: 'Roddy Ricch',
      album: 'Please Excuse Me for Being Antisocial',
      createdAt: '2022-10-21T16:01:56Z',
      duration: 117,
      songPath: '',
      coverPath:
        'https://i.scdn.co/image/ab67616d00004851600adbc750285ea1a8da249f',
    },
    {
      uid: '11',
      title: 'Knuckleheadz (feat. Ghostface Killah, U-God)',
      artist: 'Raekwon',
      album: 'Only Built 4 Cuban Linx',
      createdAt: '2023-05-05T11:38:40Z',
      duration: 162,
      songPath: '',
      coverPath:
        'https://i.scdn.co/image/ab67616d0000485110f55f2af876cc662fc4ec12',
    },
    {
      uid: '12',
      title: 'C.R.E.A.M',
      artist: 'Wu-Tang Clan',
      album: 'Enter the Wu-Tang (36 Chambers)',
      createdAt: '2023-02-17T21:11:27Z',
      duration: 49,
      songPath: '',
      coverPath:
        'https://i.scdn.co/image/ab67616d000048515901aaa980d3e714bf01171c',
    },
    {
      uid: '13',
      title: 'Thugz Dont Cry',
      artist: 'Duvy',
      album: 'GRASSWAYZ',
      createdAt: '2023-04-24T16:18:27Z',
      duration: 234,
      songPath: '',
      coverPath:
        'https://i.scdn.co/image/ab67616d00004851523abbe2478297162c7ceff6',
    },
    {
      uid: '14',
      title: 'Liquuid Swords',
      artist: 'GZA',
      album: 'Liquuid Swords',
      createdAt: '2022-12-31T21:35:06Z',
      duration: 177,
      songPath: '',
      coverPath:
        'https://i.scdn.co/image/ab67616d0000485184b6abc19fb31fb382378bbc',
    },
    {
      uid: '15',
      title: 'Water Fountain',
      artist: 'SOB X RBE',
      album: 'GANGIN II',
      createdAt: '2023-06-14T20:17:28Z',
      duration: 63,
      songPath: '',
      coverPath:
        'https://i.scdn.co/image/ab67616d000048518d47b5a053047859f3491f58',
    },
    {
      uid: '16',
      title: 'Down for Real',
      artist: 'Roddy Ricch',
      album: 'Feed Tha Streets II',
      createdAt: '2023-07-30T23:28:06Z',
      duration: 193,
      songPath: '',
      coverPath:
        'https://i.scdn.co/image/ab67616d00004851434f4eeb4231f6f4862cafd4',
    },
    {
      uid: '17',
      title: 'Day One (Outro)',
      artist: 'Roddy Ricch',
      album: 'Feed Tha Streets II',
      createdAt: '2022-10-13T04:13:38Z',
      duration: 231,
      songPath: '',
      coverPath:
        'https://i.scdn.co/image/ab67616d00004851434f4eeb4231f6f4862cafd4',
    },
    {
      uid: '18',
      title: 'The Race',
      artist: 'Tay-K',
      album: '#SantanaWorld (+)',
      createdAt: '2022-08-22T04:37:34Z',
      duration: 178,
      songPath: '',
      coverPath:
        'https://i.scdn.co/image/ab67616d00004851fbfeb7ded12a79fbd98f99e8',
    },
    {
      uid: '19',
      title: 'Always',
      artist: 'SOB X RBE',
      album: 'GANGIN',
      createdAt: '2022-11-29T18:13:02Z',
      duration: 51,
      songPath: '',
      coverPath:
        'https://i.scdn.co/image/ab67616d00004851a786ef18c38cda9515ba1fba',
    },
    {
      uid: '20',
      title: 'Streets Talkin',
      artist: 'Lil Noonie',
      album: 'Pauid In Full',
      createdAt: '2023-05-19T23:59:22Z',
      duration: 137,
      songPath: '',
      coverPath:
        'https://i.scdn.co/image/ab67616d00004851ef31403b3a52fb0976950027',
    },
    {
      uid: '21',
      title: 'TEMPTATION',
      artist: 'Joey Bada$$',
      album: 'ALL-AMERIKKKAN BADA$$',
      createdAt: '2023-05-20T00:26:42Z',
      duration: 156,
      songPath: '',
      coverPath:
        'https://i.scdn.co/image/ab67616d000048513c7596dccb2aaca39e0cee3d',
    },
    {
      uid: '22',
      title: 'The Greatest',
      artist: 'Rod Wave',
      album: 'Pray 4 Love',
      createdAt: '2022-10-31T15:03:32Z',
      duration: 235,
      songPath: '',
      coverPath:
        'https://i.scdn.co/image/ab67616d00004851759e4cc8e664b1d9e5c259cb',
    },
    {
      uid: '23',
      title: 'Hard Times (feat. Hotboii)',
      artist: 'Lil Loaded',
      album: 'CRIPTAPE',
      createdAt: '2023-05-19T19:35:14Z',
      duration: 48,
      songPath: '',
      coverPath:
        'https://i.scdn.co/image/ab67616d00004851744d730c4a958440105c3029',
    },
    {
      uid: '24',
      title: 'Panoramic',
      artist: 'YoungBoy Never Broke Again',
      album: 'Sincerely, Kentrell',
      createdAt: '2022-09-01T14:21:52Z',
      duration: 60,
      songPath: '',
      coverPath:
        'https://i.scdn.co/image/ab67616d000048514fc2bc1fbb295ceabbf5a658',
    },
    {
      uid: '25',
      title: 'Jesus Shuttlesworth',
      artist: 'BabyTron',
      album: 'Bin Reaper',
      createdAt: '2022-11-30T01:07:05Z',
      duration: 167,
      songPath: '',
      coverPath:
        'https://i.scdn.co/image/ab67616d000048512b347174b842252fcb314fe7',
    },
    {
      uid: '26',
      title: 'DEAD & GONE',
      artist: 'Lancey Foux',
      album: 'FRIEND OR FOUX',
      createdAt: '2023-04-28T17:07:43Z',
      duration: 184,
      songPath: '',
      coverPath:
        'https://i.scdn.co/image/ab67616d000048516c13dd486dfa99262a3dc919',
    },
  ];

  if (playlist && playlist.success == false) return <RedirectSync />;
  if (!data) return <></>;

  return (
    <div className="px-2 py-3">
      <Suspense fallback={<p>Loading Playlist...</p>}>
        <PlaylistHeader data={data} />
      </Suspense>
      <PlaylistTable data={playlistSongs} />
    </div>
  );
}
