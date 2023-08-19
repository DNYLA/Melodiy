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
  uid: string;
  title: string;
  artist: string;
  album?: string;
  albumArtist?: string;
  coverPath: string;
  songPath: string;
  length: number;
  createdAt: string;
  user?: PublicUser;
};
