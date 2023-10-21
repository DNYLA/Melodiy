import { PublicUser } from './user';

export type Playlist = {
  uid: string;
  title: string;
  imagePath?: string;
  createdAt: string;
  tracks: Song[];
  user: PublicUser;
};

export type TrendingPlaylist = {
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
  spotifyId?: string;
  youtubeId?: string;
  duration: number;
  createdAt: string;
  releaseDate: string;
  provider: Provider;
  user?: PublicUser;
};

export type Artist = {
  uid: string;
  name: string;
  description?: string;
  coverPath: string;
  verified: boolean;
  createdAt: string;
};

export enum Provider {
  Local = 0,
  External = 1,
}
