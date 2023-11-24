'use client';
import useOnPlay from '@/hooks/useOnPlay';
// import usePlayer from '@/hooks/stores/usePlayer';
// import useOnPlay from '@/hooks/useOnPlay';
import { Track } from '@/types';
import { CollectionType } from '@/types/collections';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { FC } from 'react';

export interface TrackTableProps {
  data: Track[];
  collectionId: string;
  /* eslint-disable @typescript-eslint/no-explicit-any */
  columns: ColumnDef<Track, any>[];
  type: CollectionType;
}

const TrackTable: FC<TrackTableProps> = ({
  columns: cl,
  data,
  collectionId,
  type,
}) => {
  const table = useReactTable({
    data,
    columns: cl,
    getCoreRowModel: getCoreRowModel(),
    enableRowSelection: true,
  });

  // const player = usePlayer();
  // const onPlay = useOnPlay();

  const player = {
    activeId: '15',
    isPlaying: false,
    setIsPlaying: (value: boolean) => console.log('isPlaying: ' + value),
  };
  const onPlay = useOnPlay();

  const onRowClick = (track: Track) => {
    const isActiveTrack = track.id === player.activeId;
    if (!player.activeId) {
      onPlay(track.id, collectionId, type);
      return;
    }

    //TODO: Fix Song Playback
    //Handles playling and pausing if same song is clicked currently bugged
    if (isActiveTrack && player.isPlaying) player.setIsPlaying(false);
    else if (isActiveTrack && !player.isPlaying) player.setIsPlaying(true);
    else onPlay(track.id, collectionId, type);

    // onPlay(song.uid);
  };

  return (
    <table className="w-full text-white ">
      <thead className="">
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {
              /* eslint-disable @typescript-eslint/no-explicit-any */
              headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-3 py-2 text-left font-medium uppercase text-[#B1B2B5]"
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
      <tbody>
        {table.getRowModel().rows.map((row) => (
          // <TableContextMenu
          //   trackId={row.original.id}
          //   ownerId={row.original.user?.id}
          //   key={row.id}
          //   type={type}
          // >
          <tr
            key={row.id}
            className="group hover:bg-[#1f1c1c]"
            onClick={() => onRowClick(row.original)}
          >
            {row.getVisibleCells().map((cell) => (
              <td
                key={cell.id}
                className="px-3 py-2 text-left first:rounded-l-lg last:rounded-r-lg"
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
          // </TableContextMenu>
        ))}
      </tbody>
    </table>
  );
};

export default TrackTable;
