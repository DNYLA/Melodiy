import { User } from '@/types/user';

export type Playlist = {
  id: string;
  title: string;
  user: User;
  image?: string;
  createdAt: string;
};
