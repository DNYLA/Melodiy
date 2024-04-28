'use client';
import { deleteTrack } from '@melodiy/api';
import * as ContextMenu from '@radix-ui/react-context-menu';
import toast from 'react-hot-toast';

interface DeleteTrackContextItemProps {
  id: string;
}

function DeleteTrackContextItem({ id }: DeleteTrackContextItemProps) {
  const handleDelete = async () => {
    try {
      //TODO: Return a list of playlistIds the song was in and then revalidate? would this be optimal or should playlists be client sided?
      await deleteTrack(id);
      // router.refresh();
      toast.success('Deleted track');
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

export default DeleteTrackContextItem;
