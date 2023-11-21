import { ComboBoxItem } from '@/components/Inputs/ComboBox';
import { Album } from '@/types/playlist';
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
    items.push({ id: album.id, name: album.title, image: album.image });
  });

  return items;
};

export const titleCase = (text: string) =>
  text.charAt(0).toUpperCase() + text.slice(1);
