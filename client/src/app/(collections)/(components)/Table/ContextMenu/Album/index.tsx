import useSession from '@/hooks/useSession';
import * as ContextMenu from '@radix-ui/react-context-menu';
import AddToFavouritesContextItem from '../Actions/AddToFavourites';
import AddToPlaylistContextItem from '../Actions/AddToPlaylist';
import QueueContextItem from '../Actions/QueueTrack';
import TrackParentRedirectsContextItems from '../Actions/TrackParentRedirect';

interface AlbumContextMenuProps {
  trackId: string;
  artistId: string;
}

const AlbumContextMenu: React.FC<AlbumContextMenuProps> = ({
  trackId,
  artistId,
}) => {
  const { user } = useSession();
  return (
    <ContextMenu.Content
      className="min-w-[220px] overflow-hidden rounded-md bg-[#1b1818] p-[5px] text-white shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]"
      alignOffset={5}
      // align="end"
    >
      <AddToPlaylistContextItem trackId={trackId} />
      <QueueContextItem trackId={trackId} />
      <AddToFavouritesContextItem />

      <ContextMenu.Separator className="m-[5px] h-[1px] bg-neutral-700" />

      <TrackParentRedirectsContextItems artistId={artistId} />
    </ContextMenu.Content>
  );
};

export default AlbumContextMenu;
