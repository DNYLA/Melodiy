import { PublicUser } from './user';

export type APIError = {
  error: string;
};

export type Playlist = {
  id: string;
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

export enum Provider {
  Local = 0,
  External = 1,
}

export enum AlbumType {
  Album = 0,
  Single = 1,
  EP = 2,
}

export enum SearchType {
  Album = 0,
  Artist = 1,
}
