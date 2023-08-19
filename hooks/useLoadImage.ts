import { Song } from '@/types/playlist';

const useLoadFile = (path: string) => {
  const host = process.env.NEXT_PUBLIC_MEDIA_HOST;

  if (!host)
    throw new Error('NEXT_PUBLIC_MEDIA_HOST environment variable not set');
  if (!path) return '';

  return host + path;
};

export default useLoadFile;
