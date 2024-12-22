import { deleteTrack } from '@melodiy/api';
import toast from 'react-hot-toast';
import ContextItemBase from '../../Base/ContextItemBase';
import { RemovefromQueueIcon } from '@melodiy/icons';

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
    <ContextItemBase onClick={handleDelete} icon={RemovefromQueueIcon}>
      Delete Song
    </ContextItemBase>
  );
}

export default DeleteTrackContextItem;
