import { ComboBoxItem } from '@/components/Inputs/SearchComboBox';
import { APIError } from '@/types';
import { CollectionType } from '@/types/collections';
import { Album } from '@/types/playlist';
import { AxiosError } from 'axios';
import clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const wait = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const addFormFile = (form: FormData, key: string, file?: FileList) => {
  if (file && file.length > 0) {
    form.append(key, file[0]);
  }
};

export const convertToComboItem = (albums?: Album[]) => {
  if (!albums) return [];
  const items: ComboBoxItem[] = [];

  albums.forEach((album) => {
    items.push({
      id: album.id,
      name: album.title,
      image: album.image,
      verified: false,
    });
  });

  return items;
};

export const titleCase = (text: string) =>
  text.charAt(0).toUpperCase() + text.slice(1);

export const collectionTypeToString = (type: CollectionType) => {
  switch (type) {
    case CollectionType.Album:
      return 'Album';
    case CollectionType.Files:
      return 'Files';
    case CollectionType.Playlist:
      return 'Public Playlist';
    default:
      return '';
  }
};

export const getDefaultImage = () => '/images/default_playlist.png';

export function msToMinuteSeconds(duration: number) {
  let minutes = Math.floor(duration / 60000);
  let seconds = Number.parseInt(((duration % 60000) / 1000).toFixed(0));
  if (seconds == 60) {
    minutes += 1;
    seconds = 0;
  }

  return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
}

export function getApiError(error: unknown) {
  const fallback = 'Unexpected Error Occured';

  if (error instanceof AxiosError) {
    const err = error as AxiosError<APIError>;
    return {
      message: err.response?.data.error ?? fallback,
      status: err.response?.status ?? 500,
    };
  }

  return { message: fallback, status: 500 };
}
