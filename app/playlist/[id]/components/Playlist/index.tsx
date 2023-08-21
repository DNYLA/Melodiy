'use client';
import SongTable from '@/components/SongTable';
import { Playlist, Song } from '@/types/playlist';
import { createColumnHelper } from '@tanstack/react-table';
import Image from 'next/image';
import React from 'react';
import {
  BsClock,
  BsFillPauseFill,
  BsFillPlayFill,
  BsMusicNoteBeamed,
} from 'react-icons/bs';
import { twMerge } from 'tailwind-merge';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import TitleCell from '@/app/playlist/[id]/components/Playlist/title';
import CounterCell from '@/app/playlist/[id]/components/Playlist/counter';
import { getImageUrl, msToMinuteSeconds } from '@/utils';
import usePlayer from '@/hooks/stores/usePlayer';
dayjs.extend(relativeTime);

interface PlaylistTableProps {
  data: Song[];
}

export default function PlaylistTable({ data }: PlaylistTableProps) {
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
          cover: getImageUrl(row.coverPath),
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

  return <SongTable data={data} columns={columns} />;
}
