import * as ContextMenu from '@radix-ui/react-context-menu';
import AddToFavouritesContextItem from '../Actions/AddToFavourites';
import AddToPlaylistContextItem from '../Actions/AddToPlaylist';
import QueueContextItem from '../Actions/QueueTrack';
import TrackParentRedirectsContextItems from '../TrackParentRedirect';
import DeleteTrackContextItem from './Actions/DeleteTrack';

interface IFileContextMenu {
  trackId: string;
  artistId: string;
  albumId?: string;
  ownerId?: number;
}

const FileContextMenu: React.FC<IFileContextMenu> = ({
  trackId,
  artistId,
  albumId,
}) => {
  return (
    <ContextMenu.Content
      className="min-w-[220px] overflow-hidden rounded-md bg-[#1b1818] p-[5px] text-white shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]"
      alignOffset={5}
      // align="end"
    >
      <AddToPlaylistContextItem trackId={trackId} />
      <QueueContextItem trackId={trackId} />
      <AddToFavouritesContextItem />
      <DeleteTrackContextItem id={trackId} />

      <ContextMenu.Separator className="m-[5px] h-[1px] bg-neutral-700" />
      <TrackParentRedirectsContextItems artistId={artistId} albumId={albumId} />
    </ContextMenu.Content>
  );
};

export default FileContextMenu;
