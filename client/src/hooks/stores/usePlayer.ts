import { FullTrack, Track } from '@/types';
import { CollectionType } from '@/types/collections';
import { create } from 'zustand';

export interface ActiveTrack {
  id: string;
  collectionId: string;
  type: CollectionType;
}

interface PlayerStore {
  active?: FullTrack & { collectionId: string; type: CollectionType };
  queue: Track[];
  isPlaying: boolean;
  setIsPlaying: (value: boolean) => void;
  // setActive: (id: string, collectionId: string, type: CollectionType) => void;
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
  isPlaying: false,
  setIsPlaying: (value: boolean) => set({ isPlaying: value }),
  setActive: (track: FullTrack, collectionId: string, type: CollectionType) =>
    set({ active: { ...track, collectionId, type: type }, isPlaying: true }),
  setQueue: (tracks: Track[]) => set({ queue: tracks }),
}));

export default usePlayer;
