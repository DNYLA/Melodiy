import toast from 'react-hot-toast';
import ContextItemBase from '../Base/ContextItemBase';
import { QueueIcon } from '@melodiy/icons';

interface QueueContextItemProps {
  trackId: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function QueueContextItem({ trackId }: QueueContextItemProps) {
  const onQueue = () => {
    // const curIds = player.active?.id;
    // curIds.splice(1, 0, trackId);
    toast.error('Queue currently disabled.');
  };

  return (
    <ContextItemBase icon={QueueIcon} onClick={onQueue}>
      Add to queue
    </ContextItemBase>
  );
}

export default QueueContextItem;
