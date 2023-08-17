import { getPlaylist } from '@/app/action';
import RedirectSync from './components/RedirectSync';
import React from 'react';
import PlaylistHeader from './components/header';
import { Song } from '@/types/playlist';
import SongList from '@/app/playlist/[id]/components/song-list';
import SongTable from '@/components/SongTable';

export default async function Playlist({ params }: { params: { id: string } }) {
  const playlist = await getPlaylist(params.id);

  //Probably a betterr way to handle all of this.
  const { data } = playlist;
  // const songs: Song[] = [
  //   {
  //     id: 1,
  //     title: 'Versatile zero tolerance challenge',
  //     artistName: 'ibaert0',
  //     cover: 'https://robohash.org/optioeumquo.png?size=125x125&set=set1',
  //   },
  //   {
  //     id: 2,
  //     title: 'Polarised impactful hardware',
  //     artistName: 'cfantonetti1',
  //     cover:
  //       'https://robohash.org/iddoloremqueblanditiis.png?size=125x125&set=set1',
  //   },
  //   {
  //     id: 3,
  //     title: 'Exclusive bi-directional concept',
  //     artistName: 'cpearl2',
  //     cover: 'https://robohash.org/namexpeditaunde.png?size=125x125&set=set1',
  //   },
  //   {
  //     id: 4,
  //     title: 'Cross-group bifurcated project',
  //     artistName: 'isatterfitt3',
  //     cover: 'https://robohash.org/delectussedvelit.png?size=125x125&set=set1',
  //   },
  //   {
  //     id: 5,
  //     title: 'Distributed global matrices',
  //     artistName: 'lortet4',
  //     cover:
  //       'https://robohash.org/architectorerumiure.png?size=125x125&set=set1',
  //   },
  //   {
  //     id: 6,
  //     title: 'Virtual global info-mediaries',
  //     artistName: 'ngregolin5',
  //     cover:
  //       'https://robohash.org/repellendusfugitrerum.png?size=125x125&set=set1',
  //   },
  //   {
  //     id: 7,
  //     title: 'Enterprise-wide motivating task-force',
  //     artistName: 'agerleit6',
  //     cover:
  //       'https://robohash.org/voluptasetrepellendus.png?size=125x125&set=set1',
  //   },
  //   {
  //     id: 8,
  //     title: 'Re-contextualized actuating hardware',
  //     artistName: 'ewonfor7',
  //     cover:
  //       'https://robohash.org/doloribuslaboriosamest.png?size=125x125&set=set1',
  //   },
  //   {
  //     id: 9,
  //     title: 'Integrated clear-thinking process improvement',
  //     artistName: 'kpesak8',
  //     cover: 'https://robohash.org/sitvitaedolorem.png?size=125x125&set=set1',
  //   },
  //   {
  //     id: 10,
  //     title: 'Down-sized scalable core',
  //     artistName: 'ctibalt9',
  //     cover:
  //       'https://robohash.org/architectoharumquaerat.png?size=125x125&set=set1',
  //   },
  //   {
  //     id: 11,
  //     title: 'Pre-emptive optimizing emulation',
  //     artistName: 'stolputta',
  //     cover: 'https://robohash.org/natusassumendaet.png?size=125x125&set=set1',
  //   },
  //   {
  //     id: 12,
  //     title: 'Open-source systemic hierarchy',
  //     artistName: 'egianullib',
  //     cover:
  //       'https://robohash.org/nesciuntlaboriosamatque.png?size=125x125&set=set1',
  //   },
  //   {
  //     id: 13,
  //     title: 'Progressive motivating conglomeration',
  //     artistName: 'gmcnabc',
  //     cover:
  //       'https://robohash.org/voluptasrepudiandaeearum.png?size=125x125&set=set1',
  //   },
  //   {
  //     id: 14,
  //     title: 'Multi-tiered client-driven initiative',
  //     artistName: 'ccarluccid',
  //     cover:
  //       'https://robohash.org/suscipitsuntdolorem.png?size=125x125&set=set1',
  //   },
  //   {
  //     id: 15,
  //     title: 'Versatile responsive instruction set',
  //     artistName: 'akrimmere',
  //     cover: 'https://robohash.org/magnamquiunde.png?size=125x125&set=set1',
  //   },
  //   {
  //     id: 16,
  //     title: 'Advanced 4th generation process improvement',
  //     artistName: 'rcellif',
  //     cover:
  //       'https://robohash.org/eligenditeneturquod.png?size=125x125&set=set1',
  //   },
  //   {
  //     id: 17,
  //     title: 'Phased disintermediate product',
  //     artistName: 'tschrireng',
  //     cover: 'https://robohash.org/incorruptiest.png?size=125x125&set=set1',
  //   },
  //   {
  //     id: 18,
  //     title: 'Networked holistic forecast',
  //     artistName: 'ghaggarthh',
  //     cover:
  //       'https://robohash.org/voluptasveritatissapiente.png?size=125x125&set=set1',
  //   },
  //   {
  //     id: 19,
  //     title: 'Synergistic optimal orchestration',
  //     artistName: 'hcasesi',
  //     cover: 'https://robohash.org/quisquamsitut.png?size=125x125&set=set1',
  //   },
  //   {
  //     id: 20,
  //     title: 'Stand-alone bottom-line task-force',
  //     artistName: 'cmarcussenj',
  //     cover: 'https://robohash.org/utrepudiandaenemo.png?size=125x125&set=set1',
  //   },
  //   {
  //     id: 21,
  //     title: 'Realigned impactful extranet',
  //     artistName: 'rfollosk',
  //     cover:
  //       'https://robohash.org/nobisnullanesciunt.png?size=125x125&set=set1',
  //   },
  //   {
  //     id: 22,
  //     title: 'Fundamental analyzing conglomeration',
  //     artistName: 'mshaddickl',
  //     cover:
  //       'https://robohash.org/iuredolorumexplicabo.png?size=125x125&set=set1',
  //   },
  //   {
  //     id: 23,
  //     title: 'Diverse modular system engine',
  //     artistName: 'mclaringboldm',
  //     cover: 'https://robohash.org/molestiaseacum.png?size=125x125&set=set1',
  //   },
  //   {
  //     id: 24,
  //     title: 'Multi-tiered secondary policy',
  //     artistName: 'chinschn',
  //     cover: 'https://robohash.org/etdoloremrerum.png?size=125x125&set=set1',
  //   },
  //   {
  //     id: 25,
  //     title: 'Synchronised empowering help-desk',
  //     artistName: 'dlinbohmo',
  //     cover: 'https://robohash.org/utsequiblanditiis.png?size=125x125&set=set1',
  //   },
  //   {
  //     id: 26,
  //     title: 'Persevering radical neural-net',
  //     artistName: 'obrattonp',
  //     cover:
  //       'https://robohash.org/recusandaevoluptatedoloribus.png?size=125x125&set=set1',
  //   },
  // ];

  if (playlist && playlist.success == false) return <RedirectSync />;
  if (!data) return <></>;

  return (
    <div className="px-2 py-3">
      <PlaylistHeader data={data} />
      <div className="flex justify-center">
        <SongTable />
      </div>
      {/* <SongList songs={songs} /> */}
    </div>
  );
}
