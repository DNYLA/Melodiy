import { Playlist } from '@/types/playlist';
import { create } from 'zustand';

interface PlaylistStore {
  playlists: Playlist[];
  setPlaylists: (playlists: Playlist[]) => void;
}

const usePlaylistStore = create<PlaylistStore>((set) => ({
  playlists: [],
  setPlaylists: (value: Playlist[]) => set({ playlists: value }),
}));

export default usePlaylistStore;
