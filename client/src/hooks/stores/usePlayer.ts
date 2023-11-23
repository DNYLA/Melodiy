import { CollectionType } from '@/types/collections';
import { create } from 'zustand';

export interface ActiveTrack {
  id: string;
  collectionId: string;
  type: CollectionType;
}

interface PlayerStore {
  active?: ActiveTrack;
  isPlaying: boolean;
  setIsPlaying: (value: boolean) => void;
  setActive: (id: string, collectionId: string, type: CollectionType) => void;
}

const usePlayer = create<PlayerStore>((set) => ({
  active: undefined,
  isPlaying: false,
  setIsPlaying: (value: boolean) => set({ isPlaying: value }),
  setActive: (id: string, collectionId: string, type: CollectionType) =>
    set({ active: { id, collectionId, type }, isPlaying: true }),
}));

export default usePlayer;
