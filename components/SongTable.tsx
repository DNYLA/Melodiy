'use client';
import React from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
} from '@tanstack/react-table';

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
