import LinkContextItem from './LinkItem';

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
      <LinkContextItem path={`artist`} slug={artistId}>
        View Artist
      </LinkContextItem>

      <LinkContextItem path={`album`} slug={albumId} disabled={!albumId}>
        View Album
      </LinkContextItem>
    </>
  );
}

export default TrackParentRedirectsContextItems;
