'use client';
import React, { useState } from 'react';
import * as ContextMenu from '@radix-ui/react-context-menu';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { AXIOS } from '@/utils/network/axios';
import toast from 'react-hot-toast';

interface DeleteSongContextProps {
  id: string;
}

export default function DeleteSongContextItem({ id }: DeleteSongContextProps) {
  const [isOpen, setIsOpen] = useState(true);
  const handleDelete = async () => {
    try {
      await AXIOS.delete(`/song/${id}`);
      toast.success('Deleted track');
    } catch (err) {
      toast.error(err as string);
    }
  };

  return (
    <ContextMenu.Item
      onClick={handleDelete}
      className="group text-sm text-red-500 leading-none rounded-[3px] flex items-center h-[25px] relative px-2 py-4 outline-none  data-[highlighted]:bg-neutral-700/80"
    >
      Delete Song
    </ContextMenu.Item>
  );
}
