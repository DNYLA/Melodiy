import { PublicUser } from './user';

export type Playlist = {
  uid: string;
  title: string;
  imagePath: string;
  user: PublicUser;
};

export type Song = {
  uid: string;
  title: string;
  artist: string;
  album?: string;
  albumArtist?: string;
  coverPath: string;
  songPath: string;
  duration: number;
  createdAt: string;
  user?: PublicUser;
};
