'use client';

import { read } from 'jsmediatags';
import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

interface TrackTags {
  title?: string;
  album?: string;
  artist?: string;
  cover?: File;
}

export default function useTrackTags(file: FileList) {
  const [isLoading, setIsLoading] = useState(false);
  const [tags, setTags] = useState<TrackTags | null>(null);

  const readTags = useCallback((file: FileList) => {
    if (!file || file.length == 0) {
      console.log(file);
      setTags(null);
      return;
    }
    setIsLoading(true);
    read(file[0], {
      onSuccess: (values) => {
        if (!values || !values.tags) return;
        const tags = values.tags;
        const loadedTags: TrackTags = {};

        if (tags.title) loadedTags.title = tags.title;
        if (tags.album) loadedTags.album = tags.album;
        if (tags.artist) loadedTags.artist = tags.artist;
        if (tags.picture) {
          const byteArray = new Uint8Array(tags.picture.data);
          const blob = new Blob([byteArray], { type: tags.picture.format });
          const file = new File([blob], 'cover');

          loadedTags.cover = file;
        }
        setTags(loadedTags);
        setIsLoading(false);
      },
      onError: (error) => {
        toast('No Tags Found', {
          icon: '⚠️',
        });
        setIsLoading(false);
        console.log(error);
      },
    });
  }, []);

  // const visibleTodos = useMemo(() => readTags(), [file]);

  useEffect(() => {
    readTags(file);
  }, [file]);

  return { tags, readTags, isLoading };
}
