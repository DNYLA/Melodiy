export { SessionContext, SessionProvider } from './providers/SessionProvider';

//TODO: Barrel Index files to specific slices

export { ArtistList } from './components/Data/ArtistList';
export { CollectionList } from './components/Data/CollectionList';
export { Image } from './components/Data/Image';
export * from './components/Inputs';
export { Sidebar } from './components/Layout/Sidebar';
export { LoginModal } from './components/Modals/Auth/LoginModal';
export { RegisterModal } from './components/Modals/Auth/RegisterModal';
export { useAuthModal } from './components/Modals/Auth/useAuthModal';
export { MultiUploadModal } from './components/Modals/MultiUpload';
export { ScrollContext } from './providers/ScrollProvider';
export * from './utils/';

//Player
export { useOnPlay } from './components/Player/hooks/useOnPlay';
export { usePlayer } from './components/Player/hooks/usePlayer';
export { useSession } from './hooks/useSession';

export { Player } from './components/Player';
export { usePlaylists } from './hooks/query/usePlaylist';

export { AdminPanel } from './components/Admin/AdminPanel';
export { AdminRegistration } from './components/Admin/Register';

export { AlbumCard, ArtistCard, PlaylistCard } from './components/Cards/';

export { Recents } from './components/Data/Recents';
