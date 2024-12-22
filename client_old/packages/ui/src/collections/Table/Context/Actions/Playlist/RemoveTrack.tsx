import { removeTrackFromPlaylist } from '@melodiy/api';
import { useParams } from '@tanstack/react-router';
import toast from 'react-hot-toast';
import ContextItemBase from '../../Base/ContextItemBase';

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
    <ContextItemBase onClick={handleRemove}>
      Remove from playlist
    </ContextItemBase>
  );
}

export default RemoveTrackContextItem;
