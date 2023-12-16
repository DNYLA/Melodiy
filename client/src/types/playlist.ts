import { Artist, Track } from '@/types';
import { User } from '@/types/user';

export type Playlist = {
  id: string;
  title: string;
  tracks: Track[];
  user: User;
  image?: string;
  createdAt: string;
};

export type Album = {
  id: string;
  title: string;
  artists: Artist[];
  tracks: Track[];
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
