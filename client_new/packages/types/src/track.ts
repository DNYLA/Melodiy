import { ArtistPreview } from './artist';
import { AlbumPreview } from './collections';
import { User } from './user';

export type Track = {
  id: string;
  title: string;
  views: number;
  duration: number;
  releaseDate: Date;
  createdAt: Date;
  artists: ArtistPreview[];
  album?: AlbumPreview;
  user?: User;
  image?: string;
};

export type FullTrack = Track & {
  path: string;
  localCdnRequestRequired: boolean;
};
