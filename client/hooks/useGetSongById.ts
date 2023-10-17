import { ServiceResponse } from '@/types';
import { Song } from '@/types/playlist';
import { AXIOS } from '@/utils/network/axios';
import { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-hot-toast';

const useGetSongById = (id?: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [song, setSong] = useState<Song | undefined>(undefined);

  useEffect(() => {
    if (!id) return;

    setIsLoading(true);

    const fetchSong = async () => {
      //TODO: Switch to SWR -> ??? what does this even mean
      const { data: res } = await AXIOS.get<ServiceResponse<Song>>(
        `song/${id}`
      );

      if (!res || !res.success || !res.data) {
        setIsLoading(false);
        toast.error(res.message);
        return;
      }

      // if (res.data.provider == Provider.External) {
      //   if (!res.data.youtubeId) return;
      //   //Fetch Youtube Stream URL.
      //   const videoInfo = await ytdl.getInfo(res.data.youtubeId);
      //   const audioFormats = ytdl.filterFormats(videoInfo.formats, 'audioonly');
      //   if (!audioFormats || audioFormats.length == 0) return;

      //   const highestAudioFormat = ytdl.chooseFormat(videoInfo.formats, {
      //     filter: 'audio',
      //     quality: 'highestaudio',
      //   });

      //   if (!highestAudioFormat) return;
      //   res.data.songPath = highestAudioFormat.url;
      // }

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
