import { ArtistPreview } from '@melodiy/types';
import { Link } from '@tanstack/react-router';
import { FC } from 'react';

export interface ArtistListProps {
  artists: ArtistPreview[];
}

function ArtistList({ artists }: ArtistListProps) {
  console.log(artists);
  return (
    <div className="flex gap-x-1">
      {artists.map((artist, i) => (
        <Link to={'/artist/$id'} params={{ id: artist.id }} key={artist.id}>
          <span className="m-0 truncate p-0 text-sm font-light text-[#969696] hover:underline">
            {artist.name}
            {i !== artists.length - 1 ? ',' : ''}
          </span>
        </Link>
      ))}
    </div>
  );
}

export { ArtistList };
