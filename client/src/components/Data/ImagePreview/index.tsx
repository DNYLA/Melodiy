import { FC, useEffect } from 'react';
import { RxCross2 } from 'react-icons/rx';
import { twMerge } from 'tailwind-merge';
import Image from '../Image';

export interface ImagePreviewProps {
  className?: string;
  src?: string;
  alt: string;
  onReset?: () => void;
}

const ImagePreview: FC<ImagePreviewProps> = ({
  className,
  src,
  alt,
  onReset,
}) => {
  useEffect(() => {
    if (!src) return;

    console.log('Ive changed');
    console.log(src);
  }, [src]);

  return (
    <div
      className={twMerge(
        'group relative flex w-[150px]',
        src && 'cursor-pointer'
      )}
      onClick={onReset}
    >
      <RxCross2
        size={35}
        className={twMerge(
          'absolute right-0 hidden px-2 py-2 group-hover:text-red-400',
          src && 'group-hover:block'
        )}
      />
      <Image
        className={twMerge('h-[150px] w-[150px] rounded', className)}
        src={src ?? '/images/default_playlist.png'}
        alt={alt}
        width={150}
        height={150}
      />
    </div>
  );
};

export default ImagePreview;
