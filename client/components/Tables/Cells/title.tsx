import { getDefaultImage } from '@/utils';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';

interface TitleCellProps {
  title: string;
  artist: string;
  cover: string;
  isActive: boolean;
}

export default function TitleCell({
  title,
  artist,
  cover,
  isActive,
}: TitleCellProps) {
  return (
    <div className="flex gap-x-2">
      <Image
        draggable={false}
        className="rounded-md"
        src={cover ?? getDefaultImage()}
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
}
