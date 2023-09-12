import { getImageUrl } from '@/lib/helpers';
import { getDefaultImage } from '@/utils';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';

interface ITitleCell {
  title: string;
  artist: string;
  cover: string;
  isActive: boolean;
}

const TitleCell: React.FC<ITitleCell> = ({
  title,
  artist,
  cover,
  isActive,
}) => {
  return (
    <div className="flex gap-x-2">
      <Image
        draggable={false}
        className="h-[45px] w-[45px] rounded-md"
        src={cover ? getImageUrl(cover) : getDefaultImage()}
        width={45}
        height={45}
        alt="Song Cover"
        priority={false}
      />
      <div className="flex flex-col">
        <span
          className={twMerge(
            'cursor-pointer text-[15px] hover:underline',
            isActive && 'text-primary'
          )}
        >
          {title}
        </span>

        <span className="cursor-pointer text-sm text-inactive hover:underline">
          {artist}
        </span>
      </div>
    </div>
  );
};

export default TitleCell;
