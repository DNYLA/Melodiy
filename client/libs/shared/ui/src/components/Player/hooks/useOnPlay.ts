import { usePlayer } from './usePlayer';
import { useSession } from '../../../hooks/useSession';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { CollectionType } from '@melodiy/types';
import { fetchFullTrack } from '@melodiy/api';

export function useOnPlay(collectionId: string, type: CollectionType) {
  const { user } = useSession();
  const player = usePlayer();
  const [position, setPosition] = useState<number | undefined>(undefined);
  const [trackId, setTrackId] = useState<string | undefined>(undefined);

  const query = useQuery({
    queryKey: ['play', { trackId, position, collectionId, userId: user?.id }], //If a track is private and a user logs out without refreshing the browser we want to make sure the track is not cached
    queryFn: async () => {
      if (trackId == null) return;
      const data = await fetchFullTrack(trackId, collectionId, type, position);

      return data;
    },
    gcTime: 0,
    enabled: !!position || !!trackId,
    refetchOnWindowFocus: false,
  });

  const onPlay = (trackId: string, position: number) => {
    setTrackId(trackId);
    setPosition(position);
  };

  useEffect(() => {
    if (query.isLoadingError) {
      toast.error("Can't play this track");
    }
    if (query.data === undefined || query.data?.currentTrack == null) return;

    const curTrack = query.data.currentTrack;
    player.setActive(curTrack, collectionId, type);
    player.setQueue(query.data.queue);
  }, [query.data, query.isLoadingError]);

  return { query, onPlay };
}
