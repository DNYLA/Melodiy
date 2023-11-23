import { CollectionType } from '@/types/collections';
import usePlayer from './stores/usePlayer';

const useOnPlay = () => {
  const player = usePlayer();
  // const { data: session } = useSession();

  const onPlay = (id: string, collectionId: string, type: CollectionType) => {
    //TODO: Check if ColllectionId == player.active.CollectionId

    player.setActive(id, collectionId, type);

    //TODO: Fetch Context / Next Songs from API
  };

  // const onPlayPause = (id: string) => {};

  return onPlay;
};

export default useOnPlay;
