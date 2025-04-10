import { CollectionType, Track } from '@melodiy/types';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { FC } from 'react';
import { twMerge } from 'tailwind-merge';
import TrackTableContextMenu from './Context';
import { useOnPlay } from '../../components/Player/hooks/useOnPlay';

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
    enableMultiRowSelection: false,
  });

  const { onPlay } = useOnPlay(collectionId, type);

  const onRowClick = (id: string, position: number) => {
    onPlay(id, position);
    return;
    // if (!player.active?.id) {
    // onPlay(track.id);
    // return;
    // }

    //TODO: Fix Song Playback
    //Handles playling and pausing if same song is clicked currently bugged
    // if (isActiveTrack && player.isPlaying) player.setIsPlaying(false);
    // else if (isActiveTrack && !player.isPlaying) player.setIsPlaying(true);
    // else onPlay(track.id);

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
          <TrackTableContextMenu
            trackId={row.original.id}
            artistId={row.original.artists[0]!.id}
            albumId={row.original.album?.id}
            ownerId={row.original.user?.id}
            key={row.id}
            type={type}
          >
            <tr
              key={row.id}
              className={twMerge(
                'group hover:bg-base-accent/10',
                row.getIsSelected() && 'bg-base-accent/10'
              )}
              onClick={() => row.toggleSelected()}
              onDoubleClick={() => {
                onRowClick(row.original.id, row.index);
                row.toggleSelected(true);
              }}
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
          </TrackTableContextMenu>
        ))}
      </tbody>
    </table>
  );
};

export default TrackTable;

export { AlbumTable } from './AlbumTable';
export { FilesTable } from './FilesTable';
export { PlaylistTable } from './PlaylistTable';
export { QueueTable } from './QueueTable';
export { SearchTable } from './SearchTable';
export { TopTracksTable } from './TopTracksTable';
