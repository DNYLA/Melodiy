import usePlayer from '@/hooks/stores/usePlayer';
import useSession from '@/hooks/useSession';
import { AXIOS } from '@/lib/network';
import { FullTrack, PlayerResponse } from '@/types';
import { CollectionType } from '@/types/collections';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

export default function useOnPlay(id?: string) {
  const { user } = useSession();
  const player = usePlayer();
  //useQuery will reset data to null whenever a new id is passed meaning that the player will
  //be reinstantiated into the DOM causing it to go "invisible" for a second. Returning a track all the time after one is loaded
  //prevents this as we can keep the previous track displayed whilst we load the next.
  const [track, setTrack] = useState<FullTrack>();

  const query = useQuery({
    queryKey: ['play', { id, userId: user?.id }], //If a track is private and a user logs out without refreshing the browser we want to make sure the track is not cached
    queryFn: async () => {
      const { data } = await AXIOS.post<PlayerResponse>(`/player/play/`, {
        trackId: id,
        collectionId: '15',
        type: CollectionType.Files,
        position: 26,
        shuffle: false,
      });

      return data;
    },
    enabled: !!id,
  });

  useEffect(() => {
    if (query.data === undefined) return;

    setTrack(query.data.currentTrack);
    player.setQueue(query.data.queue);
  }, [query.data]);

  return { query, track };
}
