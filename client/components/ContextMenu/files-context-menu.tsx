import AddToPlaylistMenu from '@/components/ContextMenu/actions/add-to-playlist';
import DeleteSongContextItem from '@/components/ContextMenu/actions/delete-song';
import LikeSongContextItem from '@/components/ContextMenu/actions/like-song';
import LinkContextItem from '@/components/ContextMenu/actions/link-item';
import QueueContextItem from '@/components/ContextMenu/actions/queue-song';
import * as ContextMenu from '@radix-ui/react-context-menu';

interface ContextProps {
  trackId: string;
  ownerId?: number;
}

export default function FileContextMenu({ trackId }: ContextProps) {
  return (
    <ContextMenu.Content
      className="min-w-[220px] overflow-hidden rounded-md bg-[#1b1818] p-[5px] text-white shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]"
      alignOffset={5}
      // align="end"
    >
      <AddToPlaylistMenu trackId={trackId} />
      <QueueContextItem trackId={trackId} />
      <LikeSongContextItem />
      <DeleteSongContextItem id={trackId} />

      <ContextMenu.Separator className="m-[5px] h-[1px] bg-neutral-700" />

      <LinkContextItem path="/artist" disabled>
        View Artist
      </LinkContextItem>
      <LinkContextItem path="/artist" disabled>
        View Album
      </LinkContextItem>
    </ContextMenu.Content>
  );
}
