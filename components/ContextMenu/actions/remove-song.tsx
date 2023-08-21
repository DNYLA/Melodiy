'use client';
import React from 'react';
import * as ContextMenu from '@radix-ui/react-context-menu';
import { AXIOS } from '@/utils/network/axios';
import toast from 'react-hot-toast';
import { revalidatePathClient } from '@/app/action';
import usePlayer from '@/hooks/stores/usePlayer';
import { useParams } from 'next/navigation';

interface RemoveSongContextProps {
  trackId: string;
  ownerId?: number;
}

export default function RemoveSongContextItem({
  trackId,
  ownerId,
}: RemoveSongContextProps) {
  const { id: playlistId } = useParams();

  const handleRemove = async () => {
    try {
      //TODO: Return a list of playlistIds the song was in and then revalidate? would this be optimal or should playlists be client sided?
      await AXIOS.delete(`/playlist/${playlistId}?song=${trackId}`);
      revalidatePathClient(`/playlist/${playlistId}`);
      toast.success('Removed from playlist');
    } catch (err) {
      console.log(err);
      toast.error(err as string);
    }
  };

  return (
    <ContextMenu.Item
      onClick={handleRemove}
      className="group text-sm text-red-500 leading-none rounded-[3px] flex items-center h-[25px] relative px-2 py-4 outline-none data-[highlighted]:bg-neutral-700/80"
    >
      Remove from playlist
    </ContextMenu.Item>
  );
}
