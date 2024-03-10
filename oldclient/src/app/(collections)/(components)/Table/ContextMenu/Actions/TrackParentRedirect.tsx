import LinkContextItem from '@/app/(collections)/(components)/Table/ContextMenu/Actions/LinkItem';

interface TrackParentRedirectProps {
  artistId: string;
  albumId?: string;
}
const TrackParentRedirectsContextItems: React.FC<TrackParentRedirectProps> = ({
  artistId,
  albumId,
}) => {
  return (
    <>
      <LinkContextItem path={`/artist/${artistId}`}>
        View Artist
      </LinkContextItem>
      <LinkContextItem path={`/album/${albumId}`} disabled={!albumId}>
        View Album
      </LinkContextItem>
    </>
  );
};

export default TrackParentRedirectsContextItems;
