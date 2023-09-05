import AddToPlaylistMenu from '@/components/Utils/ContextMenu/actions/AddToPlaylist';
import LikeSongContextItem from '@/components/Utils/ContextMenu/actions/Like';
import LinkContextItem from '@/components/Utils/ContextMenu/actions/LinkItem';
import QueueContextItem from '@/components/Utils/ContextMenu/actions/QueueSong';
import RemoveSongContextItem from '@/components/Utils/ContextMenu/actions/RemoveSong';
import usePlaylistStore from '@/hooks/stores/usePlaylistStore';
import * as ContextMenu from '@radix-ui/react-context-menu';
import { useParams } from 'next/navigation';

interface IPlaylistContextMenu {
  trackId: string;
  ownerId?: number;
}

const PlaylistContextMenu: React.FC<IPlaylistContextMenu> = ({
  trackId,
  ownerId,
}) => {
  const { id } = useParams();
  const { playlists } = usePlaylistStore();

  const isOwner = () => {
    const found = playlists.find((p) => p.uid === id);

    if (found) return true;
    return false;
  };
  return (
    <ContextMenu.Content
      className="min-w-[220px] overflow-hidden rounded-md bg-[#1b1818] p-[5px] text-white shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]"
      alignOffset={5}
      // align="end"
    >
      <AddToPlaylistMenu trackId={trackId} />
      <QueueContextItem trackId={trackId} />
      <LikeSongContextItem />
      {isOwner() && (
        <RemoveSongContextItem trackId={trackId} ownerId={ownerId} />
      )}

      <ContextMenu.Separator className="m-[5px] h-[1px] bg-neutral-700" />

      <LinkContextItem path="/artist" disabled>
        View Artist
      </LinkContextItem>
      <LinkContextItem path="/artist" disabled>
        View Album
      </LinkContextItem>
    </ContextMenu.Content>
  );
};

export default PlaylistContextMenu;
