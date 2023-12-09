import { Artist } from '@/types';
import { User } from '@/types/user';

export type Playlist = {
  id: string;
  title: string;
  user: User;
  image?: string;
  createdAt: string;
};

export type Album = {
  id: string;
  title: string;
  artists: Artist[];
  verified: boolean;
  type: AlbumType;
  user?: User;
  image?: string;
  releaseDate: string;
  createdAt: string;
};

export enum AlbumType {
  Album,
  EP,
  Single,
}
