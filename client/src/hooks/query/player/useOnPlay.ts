import usePlayer from '@/hooks/stores/usePlayer';
import useSession from '@/hooks/useSession';
import { AXIOS } from '@/lib/network';
import { PlayerResponse } from '@/types';
import { CollectionType } from '@/types/collections';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

export default function useOnPlay(collectionId: string, type: CollectionType) {
  const { user } = useSession();
  const player = usePlayer();
  const [position, setPosition] = useState<number | undefined>(undefined);

  const query = useQuery({
    queryKey: ['play', { position, collectionId, userId: user?.id }], //If a track is private and a user logs out without refreshing the browser we want to make sure the track is not cached
    queryFn: async () => {
      const { data } = await AXIOS.post<PlayerResponse>(`/player/play/`, {
        collectionId: collectionId,
        type: type,
        position,
        shuffle: false,
      });

      return data;
    },
    enabled: !!position,
  });

  const onPlay = (position: number) => {
    setPosition(position);
  };

  useEffect(() => {
    if (query.data === undefined) return;

    const curTrack = query.data.currentTrack;
    player.setActive(curTrack, collectionId, type);
    player.setQueue(query.data.queue);
  }, [query.data]);

  return { query, onPlay };
}
