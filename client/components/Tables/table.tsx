'use client';
import SongTable from '@/components/Tables/SongTable';
import { Song } from '@/types/playlist';
import { createColumnHelper } from '@tanstack/react-table';
import React from 'react';
import { BsClock } from 'react-icons/bs';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import TitleCell from '@/components/Tables/title';
import CounterCell from '@/components/Tables/counter';
import { msToMinuteSeconds } from '@/utils';
import usePlayer from '@/hooks/stores/usePlayer';
import { PlaylistType } from '@/types';
dayjs.extend(relativeTime);

interface PlaylistTableProps {
  data: Song[];
  type: PlaylistType;
}

export default function PlaylistTable({ data, type }: PlaylistTableProps) {
  const { activeId } = usePlayer();
  const isActiveTrack = (id: string) => (activeId ?? '-1') === id;

  const columnHelper = createColumnHelper<Song>();
  const columns = [
    columnHelper.accessor((_, i) => i + 1, {
      header: '#',
      cell: ({ getValue, row }) => (
        <CounterCell
          position={getValue()}
          isActive={isActiveTrack(row.original.uid)}
        />
      ),
    }),
    columnHelper.accessor(
      (row) => {
        return {
          title: row.title,
          artist: row.artist,
          cover: row.coverPath ?? getDefaultImage(),
          id: row.uid, //We could pass isActive however we will need the id in future updates
        };
      },
      {
        id: 'Title',
        cell: ({ getValue, row }) => (
          <TitleCell
            title={getValue().title}
            artist={getValue().artist}
            cover={getValue().cover}
            isActive={isActiveTrack(row.original.uid)}
          />
        ),
      }
    ),
    columnHelper.accessor('album', {
      header: 'Album',
      cell: ({ getValue }) => (
        <span className="text-[15px] hover:underline cursor-pointer">
          {getValue()}
        </span>
      ),
    }),
    columnHelper.accessor('createdAt', {
      header: 'Date Added',
      cell: ({ getValue }) => <span>{dayjs(getValue()).fromNow()}</span>,
    }),
    columnHelper.accessor('duration', {
      header: () => <BsClock size={18} className="" />,
      cell: ({ getValue }) => <span>{msToMinuteSeconds(getValue())}</span>,
    }),
  ];

  return <SongTable data={data} columns={columns} type={type} />;
}
