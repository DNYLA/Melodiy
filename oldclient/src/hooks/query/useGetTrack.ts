'use client';
import useSession from '@/hooks/useSession';
import { AXIOS } from '@/lib/network';
import { FullTrack } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

export default function useGetTrack(id?: string) {
  const { user } = useSession();
  //useQuery will reset data to null whenever a new id is passed meaning that the player will
  //be reinstantiated into the DOM causing it to go "invisible" for a second. Returning a track all the time after one is loaded
  //prevents this as we can keep the previous track displayed whilst we load the next.
  const [track, setTrack] = useState<FullTrack>();

  const query = useQuery({
    queryKey: ['track', { id, userId: user?.id }], //If a track is private and a user logs out without refreshing the browser we want to make sure the track is not cached
    queryFn: async () => {
      const { data } = await AXIOS.get<FullTrack>(`/track/${id}`);
      return data;
    },
    enabled: !!id,
  });

  useEffect(() => {
    if (query.data !== undefined) setTrack(query.data);
  }, [query.data]);

  return { query, track };
}
