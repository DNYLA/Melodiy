'use client';
import React from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
  createColumnHelper,
} from '@tanstack/react-table';
import { Song } from '@/types/playlist';
import Image from 'next/image';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { BsClock, BsFillPlayFill } from 'react-icons/bs';
dayjs.extend(relativeTime);
interface Props {
  data: unknown;
  columns: unknown;
}

export default function SongTable() {
  const data: Song[] = [
    {
      id: 1,
      title: 'Drive By',
      artist: 'Fivio Foreign',
      album: '800 BC',
      dateAdded: '2023-04-21T17:23:19Z',
      length: 52,
      cover:
        'https://robohash.org/modisimiliqueaperiam.png?size=125x125&set=set1',
    },
    {
      id: 2,
      title: 'Cross-group eco-centric architecture',
      artist: 'dmarages1',
      album: 'flormar REBORN',
      dateAdded: '2023-04-22T20:50:09Z',
      length: 229,
      cover:
        'https://robohash.org/etaspernaturbeatae.png?size=125x125&set=set1',
    },
    {
      id: 3,
      title: 'Intuitive value-added focus group',
      artist: 'fcampaigne2',
      album: 'family wellness hemorrhoidal',
      dateAdded: '2023-02-14T01:00:30Z',
      length: 13,
      cover: 'https://robohash.org/culpaoptiosed.png?size=125x125&set=set1',
    },
    {
      id: 4,
      title: 'Multi-lateral heuristic open system',
      artist: 'tciobutaro3',
      album: 'Cortizone 10 Easy Relief',
      dateAdded: '2022-11-15T18:57:26Z',
      length: 205,
      cover:
        'https://robohash.org/etevenietconsequatur.png?size=125x125&set=set1',
    },
    {
      id: 5,
      title: 'Re-contextualized empowering toolset',
      artist: 'labramski4',
      album: 'SHISEIDO ADVANCED HYDRO',
      dateAdded: '2022-12-13T13:42:25Z',
      length: 194,
      cover:
        'https://robohash.org/consequaturdoloremquedicta.png?size=125x125&set=set1',
    },
    {
      id: 6,
      title: 'Open-source exuding function',
      artist: 'tellsworthe5',
      album: 'CD HydraLife BB',
      dateAdded: '2023-08-16T03:23:16Z',
      length: 156,
      cover: 'https://robohash.org/sapienteomnishic.png?size=125x125&set=set1',
    },
    {
      id: 7,
      title: 'Vision-oriented incremental success',
      artist: 'kdebrett6',
      album: 'Grama grass Pollen',
      dateAdded: '2023-02-24T06:09:13Z',
      length: 236,
      cover:
        'https://robohash.org/dolorreprehenderiteligendi.png?size=125x125&set=set1',
    },
    {
      id: 8,
      title: 'Enhanced high-level forecast',
      artist: 'gdixon7',
      album: 'DawnMist',
      dateAdded: '2022-12-05T22:11:15Z',
      length: 4,
      cover: 'https://robohash.org/laborequialiquam.png?size=125x125&set=set1',
    },
    {
      id: 9,
      title: 'Cross-platform eco-centric migration',
      artist: 'abodsworth8',
      album: 'Treatment Set TS346752',
      dateAdded: '2023-03-12T23:10:43Z',
      length: 172,
      cover:
        'https://robohash.org/dolorumarchitectosunt.png?size=125x125&set=set1',
    },
    {
      id: 10,
      title: 'Networked context-sensitive analyzer',
      artist: 'lraggett9',
      album: 'good neighbor pharmacy',
      dateAdded: '2022-10-21T16:01:56Z',
      length: 117,
      cover: 'https://robohash.org/nonenimvero.png?size=125x125&set=set1',
    },
    {
      id: 11,
      title: 'Re-engineered encompassing orchestration',
      artist: 'ndudeniea',
      album: 'OXYGEN',
      dateAdded: '2023-05-05T11:38:40Z',
      length: 162,
      cover: 'https://robohash.org/debitisintempora.png?size=125x125&set=set1',
    },
    {
      id: 12,
      title: 'Sharable asynchronous archive',
      artist: 'lcobbaldb',
      album: 'Terrasil IPL Relief',
      dateAdded: '2023-02-17T21:11:27Z',
      length: 49,
      cover:
        'https://robohash.org/utrepudiandaecorporis.png?size=125x125&set=set1',
    },
    {
      id: 13,
      title: 'Upgradable background synergy',
      artist: 'oskipworthc',
      album: 'Cramps Spasms',
      dateAdded: '2023-04-24T16:18:27Z',
      length: 234,
      cover: 'https://robohash.org/istecorruptiipsum.png?size=125x125&set=set1',
    },
    {
      id: 14,
      title: 'Synchronised attitude-oriented protocol',
      artist: 'wdominicaccid',
      album: 'DROSPIRENONE AND ETHINYL ESTRADIOL',
      dateAdded: '2022-12-31T21:35:06Z',
      length: 177,
      cover: 'https://robohash.org/absitquis.png?size=125x125&set=set1',
    },
    {
      id: 15,
      title: 'Focused heuristic matrix',
      artist: 'cburnitte',
      album: 'Nuvigil',
      dateAdded: '2023-06-14T20:17:28Z',
      length: 63,
      cover:
        'https://robohash.org/consequaturfacereiste.png?size=125x125&set=set1',
    },
    {
      id: 16,
      title: 'Total executive hardware',
      artist: 'fthemlf',
      album: 'Amoxicillin',
      dateAdded: '2023-07-30T23:28:06Z',
      length: 193,
      cover:
        'https://robohash.org/sapienteofficiaquisquam.png?size=125x125&set=set1',
    },
    {
      id: 17,
      title: 'De-engineered tertiary service-desk',
      artist: 'npaysg',
      album: 'Dexamethasone',
      dateAdded: '2022-10-13T04:13:38Z',
      length: 231,
      cover: 'https://robohash.org/aliquamsequiaut.png?size=125x125&set=set1',
    },
    {
      id: 18,
      title: 'Down-sized upward-trending initiative',
      artist: 'hwegenerh',
      album: 'Suave Cocoa Butter',
      dateAdded: '2022-08-22T04:37:34Z',
      length: 178,
      cover:
        'https://robohash.org/doloribusquidemsit.png?size=125x125&set=set1',
    },
    {
      id: 19,
      title: 'Organic background focus group',
      artist: 'nmallabundi',
      album: 'Agropharma Isopropyl Alcohol',
      dateAdded: '2022-11-29T18:13:02Z',
      length: 51,
      cover:
        'https://robohash.org/voluptasquisrepudiandae.png?size=125x125&set=set1',
    },
    {
      id: 20,
      title: 'Customer-focused next generation access',
      artist: 'fdeknevetj',
      album: 'Ruby-Cell 4U Ampoule',
      dateAdded: '2023-05-19T23:59:22Z',
      length: 137,
      cover:
        'https://robohash.org/veronumquamtenetur.png?size=125x125&set=set1',
    },
    {
      id: 21,
      title: 'Distributed web-enabled internet solution',
      artist: 'sisaksenk',
      album: 'Sulphur Kit Refill',
      dateAdded: '2023-05-20T00:26:42Z',
      length: 156,
      cover: 'https://robohash.org/utdoloremnulla.png?size=125x125&set=set1',
    },
    {
      id: 22,
      title: 'Up-sized disintermediate moderator',
      artist: 'fjahnigl',
      album: 'Headache Complex',
      dateAdded: '2022-10-31T15:03:32Z',
      length: 235,
      cover:
        'https://robohash.org/rerumlaborecupiditate.png?size=125x125&set=set1',
    },
    {
      id: 23,
      title: 'Synergistic fault-tolerant alliance',
      artist: 'slinturnm',
      album: 'UNDECYLENIC ACID',
      dateAdded: '2023-05-19T19:35:14Z',
      length: 48,
      cover: 'https://robohash.org/eaqueipsaillum.png?size=125x125&set=set1',
    },
    {
      id: 24,
      title: 'Reactive transitional knowledge user',
      artist: 'dtadlown',
      album: 'PAXIL',
      dateAdded: '2022-09-01T14:21:52Z',
      length: 60,
      cover:
        'https://robohash.org/etquaeexercitationem.png?size=125x125&set=set1',
    },
    {
      id: 25,
      title: 'Ameliorated optimal success',
      artist: 'rmcmakino',
      album: 'Number Four Mold Mixture',
      dateAdded: '2022-11-30T01:07:05Z',
      length: 167,
      cover:
        'https://robohash.org/doloreasperioresesse.png?size=125x125&set=set1',
    },
    {
      id: 26,
      title: 'Focused 5th generation emulation',
      artist: 'criccap',
      album: 'Isopropyl Alcohol',
      dateAdded: '2023-04-28T17:07:43Z',
      length: 184,
      cover:
        'https://robohash.org/solutaharumcorrupti.png?size=125x125&set=set1',
    },
  ];

  const columnHelper = createColumnHelper<Song>();
  const columns = [
    columnHelper.accessor((row, i) => i, {
      header: '#',
      cell: (props) => (
        <span className="flex justify-center">
          <p className="group-hover:hidden">{props.getValue()}</p>
          <BsFillPlayFill size={19} className="hidden group-hover:inline" />
        </span>
      ),
    }),
    columnHelper.accessor(
      (row) => {
        return { title: row.title, artist: row.artist, cover: row.cover };
      },
      {
        id: 'Title',
        cell: (props) => (
          <div className="flex gap-x-2">
            <Image
              className="bg-black p-2 rounded-md"
              src={props.getValue().cover}
              width={55}
              height={55}
              alt="Song Cover"
            />
            <div className="flex flex-col">
              <span className="text-[15px] hover:underline cursor-pointer">
                {props.getValue().title}
              </span>
              <span className="text-sm text-inactive hover:underline cursor-pointer">
                {props.getValue().artist}
              </span>
            </div>
          </div>
        ),
      }
    ),
    columnHelper.accessor('album', {
      header: 'Album',
    }),
    columnHelper.accessor('dateAdded', {
      header: 'Date Added',
      cell: (props) => <span>{dayjs(props.getValue()).fromNow()}</span>,
    }),
    columnHelper.accessor('length', {
      header: () => <BsClock size={18} className="" />,
      cell: (props) => (
        <span>{msToMinuteSeconds(props.getValue() * 1000)}</span>
      ),
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table className="m-6 text-white w-full">
      <thead className="">
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                className="text-left px-3 py-2 border-b border-inactive"
              >
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody className="">
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id} className="hover:bg-[#1f1c1c] group">
            {row.getVisibleCells().map((cell) => (
              <td
                key={cell.id}
                className="text-left px-3 py-2 first:rounded-l-lg last:rounded-r-lg"
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function msToMinuteSeconds(duration: number) {
  var minutes = Math.floor(duration / 60000);
  var seconds = Number.parseInt(((duration % 60000) / 1000).toFixed(0));
  return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
}
