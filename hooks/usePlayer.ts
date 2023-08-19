import React from 'react';
import { create } from 'zustand';

interface PlayerStore {
  ids: string[];
  activeId?: string;
  isPlaying: boolean;
  setIsPlaying: (value: boolean) => void;
  setId: (id: string) => void;
  setIds: (ids: string[]) => void;
  reset: () => void;
}

const usePlayer = create<PlayerStore>((set) => ({
  ids: [],
  activeId: undefined,
  isPlaying: false,
  setIsPlaying: (value: boolean) => set({ isPlaying: value }),
  setId: (id: string) => set({ activeId: id, isPlaying: true }),
  setIds: (ids: string[]) => set({ ids }),
  reset: () => set({ ids: [], activeId: undefined }),
}));

export default usePlayer;
