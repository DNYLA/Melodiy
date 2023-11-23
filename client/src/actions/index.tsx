'use server';

import { revalidatePath } from 'next/cache';

export async function revalidatePathClient(path: string) {
  'use server';
  revalidatePath(path);
}
