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

export const getDefaultImage = () => '/images/default_playlist.png';
