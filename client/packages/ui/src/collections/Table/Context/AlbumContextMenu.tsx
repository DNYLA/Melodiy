import AddToFavouritesContextItem from './Actions/AddToLikes';
import AddToPlaylistContextItem from './Actions/AddToPlaylist';
import QueueContextItem from './Actions/QueueTrack';
import TrackParentRedirectsContextItems from './Actions/TrackParentRedirect';
import ContextMenuBase from './Base/ContextMenuBase';

interface AlbumContextMenuProps {
  trackId: string;
  artistId: string;
}

function AlbumContextMenu({ trackId, artistId }: AlbumContextMenuProps) {
  return (
    <ContextMenuBase>
      <AddToPlaylistContextItem trackId={trackId} />
      <QueueContextItem trackId={trackId} />
      <AddToFavouritesContextItem />

      <TrackParentRedirectsContextItems artistId={artistId} />
    </ContextMenuBase>
  );
}

export default AlbumContextMenu;
