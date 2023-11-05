import { getDefaultImage } from '@/utils';

export function getImageUrl(fileName?: string) {
  if (!fileName) return getDefaultImage();
  return fileName;
  // return process.env.NEXT_PUBLIC_CDN_URL + fileName;
}
