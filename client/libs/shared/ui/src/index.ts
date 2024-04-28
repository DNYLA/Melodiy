import { createRouter } from '@tanstack/react-router';

export { SessionContext, SessionProvider } from './providers/SessionProvider';

//TODO: Barrel Index files to specific slices

export { LoginModal } from './components/Modals/Auth/LoginModal';
export { useAuthModal } from './components/Modals/Auth/useAuthModal';
export { Sidebar } from './components/Layout/Sidebar';
export * from './utils/';
export { ScrollContext } from './providers/ScrollProvider';
export { Image } from './components/Data/Image';
export { ArtistList } from './components/Data/ArtistList';

//Player
export { usePlayer } from './components/Player/hooks/usePlayer';
export { useOnPlay } from './components/Player/hooks/useOnPlay';
export { useSession } from './hooks/useSession';

export { usePlaylists } from './hooks/query/usePlaylist';
export { Player } from './components/Player';

export { ArtistCard, AlbumCard, PlaylistCard } from './components/Cards/';

export { Recents } from './components/Data/Recents';
