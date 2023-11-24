import { Track } from '@/types';
import { CollectionType } from '@/types/collections';
import { create } from 'zustand';

export interface ActiveTrack {
  id: string;
  collectionId: string;
  type: CollectionType;
}

interface PlayerStore {
  active?: ActiveTrack;
  queue: Track[];
  isPlaying: boolean;
  setIsPlaying: (value: boolean) => void;
  setActive: (id: string, collectionId: string, type: CollectionType) => void;
  setQueue: (tracks: Track[]) => void;
}

const usePlayer = create<PlayerStore>((set) => ({
  active: undefined,
  queue: [],
  isPlaying: false,
  setIsPlaying: (value: boolean) => set({ isPlaying: value }),
  setActive: (id: string, collectionId: string, type: CollectionType) =>
    set({ active: { id, collectionId, type }, isPlaying: true }),
  setQueue: (tracks: Track[]) => set({ queue: tracks }),
}));

export default usePlayer;
