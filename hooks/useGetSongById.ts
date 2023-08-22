import { ServiceResponse } from '@/types';
import { Song } from '@/types/playlist';
import { AXIOS } from '@/utils/network/axios';
import React, { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-hot-toast';

const useGetSongById = (id?: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [song, setSong] = useState<Song | undefined>(undefined);

  useEffect(() => {
    if (!id) return;

    setIsLoading(true);

    const fetchSong = async () => {
      //TODO: Switch to SWR
      const { data: res } = await AXIOS.get<ServiceResponse<Song>>(
        `song/${id}`
      );

      if (!res || !res.success || !res.data) {
        setIsLoading(false);
        toast.error(res.message);
        return;
      }

      setSong(res.data);
      setIsLoading(false);
    };

    fetchSong();
  }, [id]);

  return useMemo(
    () => ({
      isLoading,
      song,
    }),
    [isLoading, song]
  );
};

export default useGetSongById;
