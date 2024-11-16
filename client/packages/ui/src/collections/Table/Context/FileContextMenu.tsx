import AddToFavouritesContextItem from './Actions/AddToLikes';
import AddToPlaylistContextItem from './Actions/AddToPlaylist';
import QueueContextItem from './Actions/QueueTrack';
import TrackParentRedirectsContextItems from './Actions/TrackParentRedirect';
import DeleteTrackContextItem from './Actions/File/DeleteTrack';
import ContextMenuBase from './Base/ContextMenuBase';

interface TrackContextMenuProps {
  trackId: string;
  artistId: string;
  albumId?: string;
  ownerId?: number;
}

function FileContextMenu({
  trackId,
  artistId,
  albumId,
}: TrackContextMenuProps) {
  return (
    <ContextMenuBase>
      <AddToPlaylistContextItem trackId={trackId} />
      <QueueContextItem trackId={trackId} />
      <AddToFavouritesContextItem />
      <DeleteTrackContextItem id={trackId} />
      <TrackParentRedirectsContextItems artistId={artistId} albumId={albumId} />
    </ContextMenuBase>
  );
}

export default FileContextMenu;
