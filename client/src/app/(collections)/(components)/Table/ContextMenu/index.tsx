import { CollectionType } from '@/types/collections';
import * as ContextMenu from '@radix-ui/react-context-menu';
import React from 'react';
import FileContextMenu from './File';
import PlaylistContextMenu from './Playlist';

interface TableContextProps {
  trackId: string;
  artistId: string;
  albumId?: string;
  ownerId?: number;
  children: React.ReactNode;
  type: CollectionType;
}

const TrackTableContextMenu = ({
  children,
  trackId,
  artistId,
  albumId,
  ownerId,
  type,
}: TableContextProps) => {
  //TODO: Move common vars like trackId, artistID, albumId, OwnerId, type to a context and fetch when needed via a hook

  const renderCorrectMenu = () => {
    switch (type) {
      // case CollectionType.Album:
      // return <AlbumContextMenu trackId={trackId} ownerId={ownerId} />;
      case CollectionType.Files:
        return (
          <FileContextMenu
            artistId={artistId}
            albumId={albumId}
            trackId={trackId}
            ownerId={ownerId}
          />
        );
      case CollectionType.Search:
      case CollectionType.Playlist:
        return (
          <PlaylistContextMenu
            trackId={trackId}
            ownerId={ownerId}
            artistId={artistId}
            albumId={albumId}
          />
        );
    }
  };

  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger asChild>{children}</ContextMenu.Trigger>
      <ContextMenu.Portal>{renderCorrectMenu()}</ContextMenu.Portal>
    </ContextMenu.Root>
  );
};

export default TrackTableContextMenu;
