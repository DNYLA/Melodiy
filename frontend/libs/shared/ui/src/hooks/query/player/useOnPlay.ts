import usePlayer from '../../stores/usePlayer';
import useSession from '../../useSession';
import { AXIOS } from '@melodiy/network';
import { PlayerResponse } from '@melodiy/types';
import { CollectionType } from '@melodiy/types';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function useOnPlay(collectionId: string, type: CollectionType) {
  const { user } = useSession();
  const player = usePlayer();
  const [position, setPosition] = useState<number | undefined>(undefined);
  const [trackId, setTrackId] = useState<string | undefined>(undefined);

  const query = useQuery({
    queryKey: ['play', { trackId, position, collectionId, userId: user?.id }], //If a track is private and a user logs out without refreshing the browser we want to make sure the track is not cached
    queryFn: async () => {
      const { data } = await AXIOS.post<PlayerResponse>(`/player/play/`, {
        trackId,
        collectionId: collectionId,
        type: type,
        position,
        shuffle: false,
      });
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
    if (query.data === undefined) return;

    const curTrack = query.data.currentTrack;
    player.setActive(curTrack, collectionId, type);
    player.setQueue(query.data.queue);
  }, [query.data, query.isLoadingError]);

  return { query, onPlay };
}
