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
