import * as ContextMenu from '@radix-ui/react-context-menu';
import AddToFavouritesContextItem from './Actions/AddToLikes';
import AddToPlaylistContextItem from './Actions/AddToPlaylist';
import QueueContextItem from './Actions/QueueTrack';
import TrackParentRedirectsContextItems from './Actions/TrackParentRedirect';
import { useSession } from '../../../hooks';
import ContextMenuBase from './Base/ContextMenuBase';

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
    <ContextMenuBase>
      <AddToPlaylistContextItem trackId={trackId} />
      <QueueContextItem trackId={trackId} />
      <AddToFavouritesContextItem />
      {/* {isOwner && (
        <RemoveTrackContextItem trackId={trackId} ownerId={ownerId} />
      )} */}

      <TrackParentRedirectsContextItems artistId={artistId} albumId={albumId} />
    </ContextMenuBase>
  );
};

export default PlaylistContextMenu;
