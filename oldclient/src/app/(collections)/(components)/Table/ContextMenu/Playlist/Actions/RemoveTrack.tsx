'use client';
import { revalidatePathClient } from '@/actions';
import { AXIOS } from '@/lib/network';
import * as ContextMenu from '@radix-ui/react-context-menu';
import { useParams } from 'next/navigation';
import toast from 'react-hot-toast';

interface RemoveTrackContextItemProps {
  trackId: string;
  ownerId?: number;
}

const RemoveTrackContextItem: React.FC<RemoveTrackContextItemProps> = ({
  trackId,
}) => {
  const { id: playlistId } = useParams();

  const handleRemove = async () => {
    try {
      console.log('here');
      //TODO: Return a list of playlistIds the song was in and then revalidate? would this be optimal or should playlists be client sided?
      await AXIOS.delete(`/playlist/${playlistId}?trackId=${trackId}`);
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
      className="group relative flex h-[25px] items-center rounded-[3px] px-2 py-4 text-sm leading-none text-red-500 outline-none data-[highlighted]:bg-neutral-700/80"
    >
      Remove from playlist
    </ContextMenu.Item>
  );
};

export default RemoveTrackContextItem;
