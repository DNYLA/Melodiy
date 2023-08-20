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
import usePlayer from '@/hooks/usePlayer';
import SongContextMenu from '@/components/song-context';

interface Props<T> {
  data: T[];
  columns: ColumnDef<T, any>[];
}

export default function SongTable<T>({ columns: cl, data }: Props<T>) {
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
      onPlay(song.uid);
      return;
    }

    if (isActiveTrack && player.isPlaying) player.setIsPlaying(false);
    else if (isActiveTrack && !player.isPlaying) player.setIsPlaying(true);
    else onPlay(song.uid);

    // onPlay(song.uid);
  };

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
          <SongContextMenu trackId={(row.original as Song).uid} key={row.id}>
            <tr
              key={row.id}
              className="hover:bg-[#1f1c1c] group"
              onClick={() => onRowClick(row.original as Song)}
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
