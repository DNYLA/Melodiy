'use client';
import useSession from '@/hooks/useSession';
import { AXIOS } from '@/lib/network';
import { FullTrack } from '@/types';
import { useQuery } from '@tanstack/react-query';

export default function useGetTrack(id?: string) {
  const { user } = useSession();

  const query = useQuery({
    queryKey: ['track', { id, userId: user?.id }], //If a track is private and a user logs out without refreshing the browser we want to make sure the track is not cached
    queryFn: async () => {
      const { data } = await AXIOS.get<FullTrack>(`/track/${id}`);
      return data;
    },
    enabled: !!id,
  });

  return query;
}
