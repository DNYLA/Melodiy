import AddToFavouritesContextItem from './Actions/AddToLikes';
import AddToPlaylistContextItem from './Actions/AddToPlaylist';
import QueueContextItem from './Actions/QueueTrack';
import TrackParentRedirectsContextItems from './Actions/TrackParentRedirect';
import { useSession } from '../../../hooks';
import ContextMenuBase from './Base/ContextMenuBase';

interface TrackContextMenuProps {
  children: React.ReactNode;
  trackId: string;
  artistId: string;
  albumId?: string;
}

//TODO: WIP this is broken
const TrackContextMenu: React.FC<TrackContextMenuProps> = ({
  trackId,
  artistId,
  albumId,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { user } = useSession();

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

export default TrackContextMenu;
