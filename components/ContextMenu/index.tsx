import React from 'react';
import * as ContextMenu from '@radix-ui/react-context-menu';
import {
  DotFilledIcon,
  CheckIcon,
  ChevronRightIcon,
} from '@radix-ui/react-icons';
import usePlayer from '@/hooks/stores/usePlayer';
import DeleteSongContextItem from '@/components/ContextMenu/delete-song';
import { AXIOS } from '@/utils/network/axios';
import toast from 'react-hot-toast';
import AddToPlaylistMenu from '@/components/ContextMenu/add-to-playlist';
import { twMerge } from 'tailwind-merge';

interface SongContextProps {
  trackId: string;
  children: React.ReactNode;
}

const SongContextMenu = ({ children, trackId }: SongContextProps) => {
  const [bookmarksChecked, setBookmarksChecked] = React.useState(true);
  const [urlsChecked, setUrlsChecked] = React.useState(false);
  const [person, setPerson] = React.useState('pedro');

  const player = usePlayer();

  const onQueue = (id: string) => {
    const curIds = player.ids;
    curIds.splice(1, 0, id);
    toast.success('Added to queue');
  };

  const handleDelete = async (id: string) => {
    try {
      await AXIOS.delete(`/song/${id}`);
      toast.success('Deleted track');
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const contextClass =
    'group text-sm leading-none rounded-[3px] flex items-center h-[25px] relative px-2 py-4 outline-none  data-[highlighted]:bg-neutral-700/80 data-[disabled]:text-inactive';

  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger asChild>{children}</ContextMenu.Trigger>
      <ContextMenu.Portal>
        <ContextMenu.Content
          className="min-w-[220px] bg-[#1b1818] text-white rounded-md overflow-hidden p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]"
          alignOffset={5}
          // align="end"
        >
          <AddToPlaylistMenu />
          <ContextMenu.Item
            onClick={() => onQueue(trackId)}
            className={contextClass}
          >
            Add to queue
          </ContextMenu.Item>
          <ContextMenu.Item disabled className={contextClass}>
            Add to Liked Songs
          </ContextMenu.Item>

          {/* <DeleteSongContextItem id={trackId} /> */}
          <ContextMenu.Item
            onClick={() => handleDelete(trackId)}
            className={twMerge(contextClass, 'text-red-500')}
          >
            Delete Song
          </ContextMenu.Item>

          <ContextMenu.Separator className="h-[1px] bg-neutral-700 m-[5px]" />
          <ContextMenu.Item disabled className={contextClass}>
            View artist
          </ContextMenu.Item>
          <ContextMenu.Item disabled className={contextClass}>
            View album
          </ContextMenu.Item>
        </ContextMenu.Content>
      </ContextMenu.Portal>
    </ContextMenu.Root>
  );
};

export default SongContextMenu;
