import { Album } from '@/types/playlist';
import { User } from '@/types/user';

export type APIError = {
  error: string;
};

export enum SearchType {
  Album = 0,
  Artist = 1,
}

export type Artist = {
  id: string;
  name: string;
  verified: boolean;
  user?: User;
  image?: string;
  createdAt: string;
};

export interface SearchResult {
  albums: Album[];
  artists: Artist[];
  // tracks: Track[]
}

export type Track = {
  id: string;
  title: string;
  duration: number;
  releaseDate: string;
  createdAt: string;
  artists: ArtistPreview[];
  album?: AlbumPreview;
  user: User;
  image: string;
};

export type FullTrack = Track & {
  path: string;
};

export type ArtistPreview = {
  id: string;
  name: string;
};

export type AlbumPreview = {
  id: string;
  title: string;
};
