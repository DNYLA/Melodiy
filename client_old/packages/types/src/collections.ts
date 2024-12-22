import { ArtistPreview } from './artist';
import { Track } from './track';
import { User } from './user';

export enum CollectionType {
  Album = 0,
  Playlist = 1,
  MyFiles = 2,
  Search = 3,
}

export type Album = {
  id: string;
  title: string;
  verified: boolean;
  type: AlbumType;
  artists: ArtistPreview[];
  tracks: Track[];
  image?: string;
  releaseDate: Date;
  createdAt: Date;
};

export type AlbumPreview = {
  id: string;
  title: string;
  image?: string;
};

export enum AlbumType {
  Album,
  EP,
  Single,
}

export type Playlist = {
  id: string;
  title: string;
  public: boolean;
  tracks: Track[];
  user: User;
  image?: string;
  createdAt: Date;
};
