'use client';

import { ArtistPreview } from '@/types';
import { useRouter } from 'next/navigation';
import { FC } from 'react';

export interface ArtistListProps {
  artists: ArtistPreview[];
}

const ArtistList: FC<ArtistListProps> = ({ artists }) => {
  const router = useRouter();
  const handleRedirect = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    id: string
  ) => {
    e.stopPropagation();
    router.push(`/artist/${id}`);
  };

  return (
    <div className="flex gap-x-1">
      {artists.map((artist, i) => (
        <span
          key={artist.id}
          onClick={(e) => handleRedirect(e, artist.id)}
          className="m-0 truncate p-0 text-sm font-light text-[#969696] hover:underline"
        >
          {artist.name}
          {i !== artists.length - 1 ? ',' : ''}
        </span>
      ))}
    </div>
  );
};

export default ArtistList;
