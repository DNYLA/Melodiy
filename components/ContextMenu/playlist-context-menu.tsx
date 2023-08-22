import React from 'react';
import * as ContextMenu from '@radix-ui/react-context-menu';
import AddToPlaylistMenu from '@/components/ContextMenu/actions/add-to-playlist';
import QueueContextItem from '@/components/ContextMenu/actions/queue-song';
import LikeSongContextItem from '@/components/ContextMenu/actions/like-song';
import LinkContextItem from '@/components/ContextMenu/actions/link-item';
import RemoveSongContextItem from '@/components/ContextMenu/actions/remove-song';
import { useParams } from 'next/navigation';
import usePlaylistStore from '@/hooks/stores/usePlaylistStore';

interface ContextProps {
  trackId: string;
  ownerId?: number;
}

export default function PlaylistContextMenu({
  trackId,
  ownerId,
}: ContextProps) {
  const { id } = useParams();
  const { playlists } = usePlaylistStore();

  const isOwner = () => {
    const found = playlists.find((p) => p.uid === id);

    if (found) return true;
    return false;
  };
  return (
    <ContextMenu.Content
      className="min-w-[220px] bg-[#1b1818] text-white rounded-md overflow-hidden p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]"
      alignOffset={5}
      // align="end"
    >
      <AddToPlaylistMenu trackId={trackId} />
      <QueueContextItem trackId={trackId} />
      <LikeSongContextItem />
      {isOwner() && (
        <RemoveSongContextItem trackId={trackId} ownerId={ownerId} />
      )}

      <ContextMenu.Separator className="h-[1px] bg-neutral-700 m-[5px]" />

      <LinkContextItem path="/artist" disabled>
        View Artist
      </LinkContextItem>
      <LinkContextItem path="/artist" disabled>
        View Album
      </LinkContextItem>
    </ContextMenu.Content>
  );
}