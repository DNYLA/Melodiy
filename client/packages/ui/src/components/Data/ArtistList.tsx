import { ArtistPreview } from '@melodiy/types';
import { Link } from '@melodiy/router';

export interface ArtistListProps {
  artists: ArtistPreview[];
}

function ArtistList({ artists }: ArtistListProps) {
  return (
    <div className="flex truncate gap-x-1">
      {artists.map((artist, i) => (
        <Link to={'/artist/$id'} params={{ id: artist.id }} key={artist.id}>
          <span className="m-0 p-0 text-sm font-light text-[#969696] hover:underline">
            {artist.name}
            {i !== artists.length - 1 ? ',' : ''}
          </span>
        </Link>
      ))}
    </div>
  );
}

export { ArtistList };
