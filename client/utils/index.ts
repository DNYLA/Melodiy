import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// export function getImageUrl(fileName: string) {
//   const host = process.env.NEXT_PUBLIC_MEDIA_HOST;

//   if (!host)
//     throw new Error('NEXT_PUBLIC_MEDIA_HOST environment variable not set');

//   if (!fileName) return host + 'images/default_playlist.png';

//   return host + fileName;
// }

export const getDefaultImage = () => {
  return '/images/default_playlist.png';
};

export function msToMinuteSeconds(duration: number) {
  var minutes = Math.floor(duration / 60000);
  var seconds = Number.parseInt(((duration % 60000) / 1000).toFixed(0));
  return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
}
