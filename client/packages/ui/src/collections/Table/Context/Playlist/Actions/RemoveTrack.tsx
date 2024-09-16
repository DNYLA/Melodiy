import { removeTrackFromPlaylist } from '@melodiy/api';
import * as ContextMenu from '@radix-ui/react-context-menu';
import { useParams } from '@tanstack/react-router';
import toast from 'react-hot-toast';

interface RemoveTrackContextItemProps {
  trackId: string;
  ownerId?: number;
}

function RemoveTrackContextItem({ trackId }: RemoveTrackContextItemProps) {
  const params = useParams({ from: '/playlist/$id' });

  const handleRemove = async () => {
    try {
      //TODO: Return a list of playlistIds the song was in and then revalidate? would this be optimal or should playlists be client sided?
      await removeTrackFromPlaylist(params.id, trackId);
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
}

export default RemoveTrackContextItem;
