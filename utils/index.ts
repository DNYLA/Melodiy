import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getImageUrl(fileName: string) {
  const host = process.env.NEXT_PUBLIC_MEDIA_HOST;

  if (!host)
    throw new Error('NEXT_PUBLIC_MEDIA_HOST environment variable not set');
  return host + fileName;
}
