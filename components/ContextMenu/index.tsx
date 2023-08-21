import React from 'react';
import * as ContextMenu from '@radix-ui/react-context-menu';
import {
  DotFilledIcon,
  CheckIcon,
  ChevronRightIcon,
} from '@radix-ui/react-icons';
import usePlayer from '@/hooks/stores/usePlayer';
import DeleteSongContextItem from '@/components/ContextMenu/actions/delete-song';
import { AXIOS } from '@/utils/network/axios';
import toast from 'react-hot-toast';
import AddToPlaylistMenu from '@/components/ContextMenu/actions/add-to-playlist';
import { twMerge } from 'tailwind-merge';
import PlaylistContextMenu from '@/components/ContextMenu/playlist-context-menu';
import { PlaylistType } from '@/types';
import FileContextMenu from '@/components/ContextMenu/files-context-menu';

interface SongContextProps {
  trackId: string;
  ownerId?: number;
  children: React.ReactNode;
  type: PlaylistType;
}

const SongContextMenu = ({
  children,
  trackId,
  ownerId,
  type,
}: SongContextProps) => {
  const renderCorrectMenu = () => {
    if (type === PlaylistType.Playlist)
      return <PlaylistContextMenu trackId={trackId} ownerId={ownerId} />;
    else if (type === PlaylistType.Files)
      return <FileContextMenu trackId={trackId} ownerId={ownerId} />;
  };

  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger asChild>{children}</ContextMenu.Trigger>
      <ContextMenu.Portal>{renderCorrectMenu()}</ContextMenu.Portal>
    </ContextMenu.Root>
  );
};

export default SongContextMenu;
