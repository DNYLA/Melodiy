import usePlayer from '@/hooks/stores/usePlayer';
import * as ContextMenu from '@radix-ui/react-context-menu';
import toast from 'react-hot-toast';

interface QueueContextProps {
  trackId: string;
}

export default function QueueContextItem({ trackId }: QueueContextProps) {
  const player = usePlayer();

  const onQueue = () => {
    const curIds = player.ids;
    curIds.splice(1, 0, trackId);
    toast.success('Added to queue');
  };

  return (
    <ContextMenu.Item
      onClick={onQueue}
      className={
        'group text-sm leading-none rounded-[3px] flex items-center h-[25px] relative px-2 py-4 outline-none  data-[highlighted]:bg-neutral-700/80 data-[disabled]:text-inactive'
      }
    >
      Add to queue
    </ContextMenu.Item>
  );
}
