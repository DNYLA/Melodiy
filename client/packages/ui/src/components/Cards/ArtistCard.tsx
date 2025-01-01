import { Link } from '@melodiy/router';
import { getDefaultArtistImage } from '../../utils';
import { Image } from '../Data/Image';

export interface ArtistCardProps {
  id: string;
  name: string;
  imageSrc?: string;
}

function ArtistCard({ id, name, imageSrc }: ArtistCardProps) {
  return (
    <Link to={'/artist/$id'} params={{ id }}>
      <div className="flex h-[200px] w-[160px] cursor-pointer flex-col items-center justify-center gap-y-1">
        <Image
          draggable={false}
          className={'max-h-[160px] max-w-[160px] rounded-full'}
          src={imageSrc}
          fallback={getDefaultArtistImage()}
          width={160}
          height={160}
          alt="Artist Avatar"
        />
        <p className="font-bold text-center truncate hover:underline">{name}</p>
      </div>
    </Link>
  );
}

export { ArtistCard };
