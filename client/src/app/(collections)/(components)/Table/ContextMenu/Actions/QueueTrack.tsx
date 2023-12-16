import * as ContextMenu from '@radix-ui/react-context-menu';
import toast from 'react-hot-toast';

interface QueueContextItemProps {
  trackId: string;
}

const QueueContextItem: React.FC<QueueContextItemProps> = () => {
  const onQueue = () => {
    // const curIds = player.active?.id;
    // curIds.splice(1, 0, trackId);
    toast.error('Queue currently disabled.');
  };

  return (
    <ContextMenu.Item
      onClick={onQueue}
      className={
        'group relative flex h-[25px] items-center rounded-[3px] px-2 py-4 text-sm leading-none outline-none  data-[highlighted]:bg-neutral-700/80 data-[disabled]:text-inactive'
      }
    >
      Add to queue
    </ContextMenu.Item>
  );
};

export default QueueContextItem;
