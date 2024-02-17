import { FullTrack, Track } from '@/types';
import { CollectionType } from '@/types/collections';
import { create } from 'zustand';

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

interface PlayerStore {
  active?: FullTrack & { collectionId: string; type: CollectionType };
  queue: Track[];
  type: PlayerType;
  mode: PlayerMode;
  isPlaying: boolean;
  setIsPlaying: (value: boolean) => void;
  setType: (type: PlayerType) => void;
  setMode: (mode: PlayerMode) => void;
  setActive: (
    track: FullTrack,
    collectionId: string,
    type: CollectionType
  ) => void;
  setQueue: (tracks: Track[]) => void;
}

const usePlayer = create<PlayerStore>((set) => ({
  active: undefined,
  queue: [],
  type: PlayerType.Shuffle,
  mode: PlayerMode.NoRepeat,
  isPlaying: false,
  setIsPlaying: (value: boolean) => set({ isPlaying: value }),
  setType: (type: PlayerType) => set({ type }),
  setMode: (mode: PlayerMode) => set({ mode }),
  setActive: (track: FullTrack, collectionId: string, type: CollectionType) =>
    set({
      active: { ...track, collectionId, type: type },
      isPlaying: true,
    }),
  setQueue: (tracks: Track[]) => set({ queue: tracks }),
}));

export default usePlayer;
