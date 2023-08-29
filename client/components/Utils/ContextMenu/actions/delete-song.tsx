'use client';
import { revalidatePathClient } from '@/app/action';
import usePlayer from '@/hooks/stores/usePlayer';
import { AXIOS } from '@/utils/network/axios';
import * as ContextMenu from '@radix-ui/react-context-menu';
import toast from 'react-hot-toast';

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
      className="group relative flex h-[25px] items-center rounded-[3px] px-2 py-4 text-sm leading-none text-red-500 outline-none  data-[highlighted]:bg-neutral-700/80"
    >
      Delete Song
    </ContextMenu.Item>
  );
}
