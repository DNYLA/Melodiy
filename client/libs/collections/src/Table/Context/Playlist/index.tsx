import { useSession } from '@melodiy/shared-ui';
import * as ContextMenu from '@radix-ui/react-context-menu';
import AddToFavouritesContextItem from '../Actions/AddToFavourites';
import AddToPlaylistContextItem from '../Actions/AddToPlaylist';
import QueueContextItem from '../Actions/QueueTrack';
import TrackParentRedirectsContextItems from '../Actions/TrackParentRedirect';
import RemoveTrackContextItem from './Actions/RemoveTrack';

interface PlaylistContextMenuProps {
  trackId: string;
  artistId: string;
  albumId?: string;
  ownerId?: number;
}

const PlaylistContextMenu: React.FC<PlaylistContextMenuProps> = ({
  trackId,
  ownerId,
  artistId,
  albumId,
}) => {
  const { user } = useSession();
  const isOwner = ownerId === user?.id;

  return (
    <ContextMenu.Content
      className="min-w-[220px] overflow-hidden rounded-md bg-[#1b1818] p-[5px] text-white shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]"
      alignOffset={5}
      // align="end"
    >
      <AddToPlaylistContextItem trackId={trackId} />
      <QueueContextItem trackId={trackId} />
      <AddToFavouritesContextItem />
      {isOwner && (
        <RemoveTrackContextItem trackId={trackId} ownerId={ownerId} />
      )}

      <ContextMenu.Separator className="m-[5px] h-[1px] bg-neutral-700" />
      <TrackParentRedirectsContextItems artistId={artistId} albumId={albumId} />
    </ContextMenu.Content>
  );
};

export default PlaylistContextMenu;
