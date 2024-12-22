/* eslint-disable no-unused-vars */
import {
  CollectionType,
  FullTrack,
  PlayerMode,
  PlayerType,
  Track,
} from '@melodiy/types';
import { create } from 'zustand';

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
    type: CollectionType,
  ) => void;
  setQueue: (tracks: Track[]) => void;
}

const usePlayer = create<PlayerStore>((set) => ({
  active: undefined,
  queue: [],
  type: PlayerType.Normal,
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

export { usePlayer };
