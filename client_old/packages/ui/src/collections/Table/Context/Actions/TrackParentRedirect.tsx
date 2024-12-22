import { Link } from '@tanstack/react-router';
import ContextItemBase from '../Base/ContextItemBase';
import { AlbumIcon, ArtistIcon } from '@melodiy/icons';

interface TrackParentRedirectProps {
  artistId: string;
  albumId?: string;
}
function TrackParentRedirectsContextItems({
  artistId,
  albumId,
}: TrackParentRedirectProps) {
  return (
    <>
      <Link to={`/artist/$id`} params={{ id: artistId }} disabled={!artistId}>
        <ContextItemBase icon={ArtistIcon} disabled={!artistId}>
          View Artist
        </ContextItemBase>
      </Link>

      {albumId && (
        <Link to={`/album/$id`} params={{ id: albumId }}>
          <ContextItemBase icon={AlbumIcon}>View Album</ContextItemBase>
        </Link>
      )}
    </>
  );
}

export default TrackParentRedirectsContextItems;
