'use client';
import React from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
} from '@tanstack/react-table';
import useOnPlay from '@/hooks/useOnPlay';
import { Song } from '@/types/playlist';
import usePlayer from '@/hooks/stores/usePlayer';
import SongContextMenu from '@/components/ContextMenu';
import { PlaylistType } from '@/types';

interface Props {
  data: Song[];
  /* eslint-disable @typescript-eslint/no-explicit-any */
  columns: ColumnDef<Song, any>[];
  type: PlaylistType;
}

export default function PlaylistTable({ columns: cl, data, type }: Props) {
  const table = useReactTable({
    data,
    columns: cl,
    getCoreRowModel: getCoreRowModel(),
    enableRowSelection: true,
  });

  const player = usePlayer();
  const onPlay = useOnPlay();

  const onRowClick = (song: Song) => {
    const isActiveTrack = song.uid === player.activeId;
    console.log(isActiveTrack);
    if (!player.activeId) {
      onPlay(song.uid, data);
      return;
    }

    //Handles playling and pausing if same song is clicked currently bugged
    if (isActiveTrack && player.isPlaying) player.setIsPlaying(false);
    else if (isActiveTrack && !player.isPlaying) player.setIsPlaying(true);
    else onPlay(song.uid, data);

    // onPlay(song.uid);
  };

  return (
    <table className="m-6 text-white w-full">
      <thead className="">
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {
              /* eslint-disable @typescript-eslint/no-explicit-any */
              headerGroup.headers.map((header) => (
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
              ))
            }
          </tr>
        ))}
      </thead>
      <tbody className="">
        {table.getRowModel().rows.map((row) => (
          <SongContextMenu
            trackId={row.original.uid}
            ownerId={row.original.user?.id}
            key={row.id}
            type={type}
          >
            <tr
              key={row.id}
              className="hover:bg-[#1f1c1c] group"
              onClick={() => onRowClick(row.original)}
            >
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="text-left px-3 py-2 first:rounded-l-lg last:rounded-r-lg"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          </SongContextMenu>
        ))}
      </tbody>
    </table>
  );
}
