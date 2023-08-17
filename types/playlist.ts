import { PublicUser } from './user';

export type Playlist = {
  id: number;
  shareId: string;
  title: string;
  imagePath: string;
  user: PublicUser;
};

export type Song = {
  id: number;
  title: string;
  artist: string;
  album: string;
  dateAdded: string;
  length: number;
  cover: string;
};
