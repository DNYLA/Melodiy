import Image from '@/components/Data/Image';
import { getDefaultImage } from '@/lib/utils';
import { ArtistPreview } from '@/types';
import { useRouter } from 'next/navigation';
import { twMerge } from 'tailwind-merge';

interface ITitleCell {
  title: string;
  artists: ArtistPreview[];
  cover: string;
  isActive: boolean;
}

const TitleCell: React.FC<ITitleCell> = ({
  title,
  artists,
  cover,
  isActive,
}) => {
  const router = useRouter();
  return (
    <div className="flex gap-x-2">
      <Image
        draggable={false}
        className="h-[45px] w-[45px] rounded-md"
        src={cover ?? getDefaultImage()}
        width={45}
        height={45}
        alt="Song Cover"
        priority={false}
        quality={100}
      />
      <div className="flex flex-col">
        <span
          className={twMerge(
            'cursor-pointer text-[15px] hover:underline',
            isActive && 'text-primary-light'
          )}
        >
          {title}
        </span>
        <div className="flex gap-x-1">
          {artists.map((artist, i) => (
            <span
              key={artist.id}
              onClick={() => router.push(`/artist/${artist.id}`)}
              className="cursor-pointer text-sm text-inactive hover:underline"
            >
              {artist.name}
              {i !== artists.length - 1 ? ',' : ''}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TitleCell;
