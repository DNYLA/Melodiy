import { CollectionType } from '@melodiy/types';
import * as ContextMenu from '@radix-ui/react-context-menu';
import React from 'react';
import AlbumContextMenu from './AlbumContextMenu';
import FileContextMenu from './FileContextMenu';
import PlaylistContextMenu from './PlaylistContextMenu';

interface TableContextProps {
  trackId: string;
  artistId: string;
  albumId?: string;
  ownerId?: number;
  children: React.ReactNode;
  type: CollectionType;
}

function TrackTableContextMenu({
  children,
  trackId,
  artistId,
  albumId,
  ownerId,
  type,
}: TableContextProps) {
  //TODO: Move common vars like trackId, artistID, albumId, OwnerId, type to a context and fetch when needed via a hook
  const renderCorrectMenu = () => {
    switch (type) {
      case CollectionType.Album:
        return <AlbumContextMenu trackId={trackId} artistId={artistId} />;
      case CollectionType.MyFiles:
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
      <ContextMenu.Portal>
        <div className="z-[90]">{renderCorrectMenu()}</div>
      </ContextMenu.Portal>
    </ContextMenu.Root>
  );
}

export default TrackTableContextMenu;
