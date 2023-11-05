import AddToPlaylistMenu from '@/components/Utils/ContextMenu/actions/AddToPlaylist';
import LikeSongContextItem from '@/components/Utils/ContextMenu/actions/Like';
import LinkContextItem from '@/components/Utils/ContextMenu/actions/LinkItem';
import QueueContextItem from '@/components/Utils/ContextMenu/actions/QueueSong';
import * as ContextMenu from '@radix-ui/react-context-menu';

interface IAlbumContextMenu {
  trackId: string;
  ownerId?: number;
}

const AlbumContextMenu: React.FC<IAlbumContextMenu> = ({ trackId }) => {
  return (
    <ContextMenu.Content
      className="min-w-[220px] overflow-hidden rounded-md bg-[#1b1818] p-[5px] text-white shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]"
      alignOffset={5}
      // align="end"
    >
      <AddToPlaylistMenu trackId={trackId} />
      <QueueContextItem trackId={trackId} />
      <LikeSongContextItem />

      <ContextMenu.Separator className="m-[5px] h-[1px] bg-neutral-700" />

      <LinkContextItem path="/artist" disabled>
        View Artist
      </LinkContextItem>
    </ContextMenu.Content>
  );
};

export default AlbumContextMenu;
