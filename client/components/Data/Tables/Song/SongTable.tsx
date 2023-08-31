'use client';
import SongContextMenu from '@/components/Utils/ContextMenu/SongContextMenu/SongContextMenu';
import usePlayer from '@/hooks/stores/usePlayer';
import useOnPlay from '@/hooks/useOnPlay';
import { PlaylistType } from '@/types';
import { Song } from '@/types/playlist';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

export interface ISongTable {
  data: Song[];
  /* eslint-disable @typescript-eslint/no-explicit-any */
  columns: ColumnDef<Song, any>[];
  type: PlaylistType;
}

const SongTable: React.FC<ISongTable> = ({ columns: cl, data, type }) => {
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

    //TODO: Fix Song Playback
    //Handles playling and pausing if same song is clicked currently bugged
    if (isActiveTrack && player.isPlaying) player.setIsPlaying(false);
    else if (isActiveTrack && !player.isPlaying) player.setIsPlaying(true);
    else onPlay(song.uid, data);

    // onPlay(song.uid);
  };

  return (
    <table className="m-6 w-full text-white">
      <thead className="">
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {
              /* eslint-disable @typescript-eslint/no-explicit-any */
              headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="border-b border-inactive px-3 py-2 text-left"
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
          </SongContextMenu>
        ))}
      </tbody>
    </table>
  );
};

export default SongTable;
