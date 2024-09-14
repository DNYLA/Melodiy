import { Album } from './collections';
import { Track } from './track';

export type Artist = {
  id: string;
  name: string;
  verified: boolean;
  image?: string;
  createdAt: Date;
};

export type FullArtist = Artist & {
  description?: string;
  monthlyListeners: number;
  userAlbums: Album[];
  albums: Album[];
  singles: Album[];
  topTracks: Track[];
};

export type ArtistPreview = {
  id: string;
  name: string;
  image?: string;
};
