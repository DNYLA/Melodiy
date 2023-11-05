import { Artist, Song } from '@/types/playlist';

export interface SearchResults {
  songs: Song[];
  artists: Artist[];
}
