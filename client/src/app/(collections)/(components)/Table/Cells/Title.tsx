import Image from '@/components/Data/Image';
import ArtistList from '@/components/Utils/Player/artist-list';
import { getDefaultImage } from '@/lib/utils';
import { ArtistPreview } from '@/types';
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
            'text-[15px]',
            isActive && 'font-medium text-primary-light'
          )}
        >
          {title}
        </span>
        <ArtistList artists={artists} />
      </div>
    </div>
  );
};

export default TitleCell;
