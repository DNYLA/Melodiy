import { CollectionType } from './collections';
import { FullTrack, Track } from './track';

export type PlayerResponse = {
  currentTrack: FullTrack;
  queue: Track[];
};

export interface ActiveTrack {
  id: string;
  collectionId: string;
  type: CollectionType;
}

export enum PlayerType {
  Normal = 0,
  Shuffle = 1,
}

export enum PlayerMode {
  NoRepeat = 0,
  Repeat = 1,
  RepeatTrack = 2,
}
