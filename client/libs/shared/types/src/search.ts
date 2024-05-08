import { Artist } from './artist';
import { Album } from './collections';
import { Track } from './track';

export enum SearchType {
  Album,
  Artist,
  Track,
  All,
}

export interface SearchResult {
  albums: Album[];
  artists: Artist[];
  tracks: Track[];
}
