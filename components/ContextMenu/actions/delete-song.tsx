'use client';
import React from 'react';
import * as ContextMenu from '@radix-ui/react-context-menu';
import { AXIOS } from '@/utils/network/axios';
import toast from 'react-hot-toast';
import { revalidatePathClient } from '@/app/action';
import usePlayer from '@/hooks/stores/usePlayer';

interface DeleteSongContextProps {
  id: string;
}

export default function DeleteSongContextItem({ id }: DeleteSongContextProps) {
  const player = usePlayer();
  const handleDelete = async () => {
    try {
      //TODO: Return a list of playlistIds the song was in and then revalidate? would this be optimal or should playlists be client sided?
      await AXIOS.delete(`/song/${id}`);
      revalidatePathClient('/files');
      // router.refresh();
      toast.success('Deleted track');
      if (player.activeId == id) {
        setTimeout(() => player.reset(), 350);
      }
    } catch (err) {
      console.log(err);
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