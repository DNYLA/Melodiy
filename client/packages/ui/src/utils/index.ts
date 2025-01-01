import clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const wait = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export function msToMinuteSeconds(duration: number) {
  let minutes = Math.floor(duration / 60000);
  let seconds = Number.parseInt(((duration % 60000) / 1000).toFixed(0));
  if (seconds == 60) {
    minutes += 1;
    seconds = 0;
  }

  return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
}

export const getDefaultImage = () => '/images/default_playlist.jpg';
export const getDefaultArtistImage = () => '/images/default_artist.jpg';
export const getDefaultPlaylistImage = () => '/images/default_playlist.jpg';
export const getDefaultTrackImage = () => '/images/default_track.jpg';
export const getDefaultUserImage = () => '/images/default_avatar.jpg';

export function addFormFile(form: FormData, key: string, file?: FileList) {
  if (file && file.length > 0) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    form.append(key, file[0] as any); //TODO: Fix any
  }
}

export function debugLog(log: string) {
  if (process.env.NODE_ENV !== 'production') console.log(log);
}
