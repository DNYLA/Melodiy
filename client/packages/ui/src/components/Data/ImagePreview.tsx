import { useEffect } from 'react';
import { RxCross2 } from 'react-icons/rx';
import { twMerge } from 'tailwind-merge';
import { Image } from './Image';

export interface ImagePreviewProps {
  className?: string;
  src?: string;
  alt: string;
  fallback?: string;
  onReset?: () => void;
}

function ImagePreview({
  className,
  src,
  fallback,
  alt,
  onReset,
}: ImagePreviewProps) {
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
        // placeholder="blur" //TODO: Fix
        src={src}
        fallback={fallback}
        alt={alt}
        width={150}
        height={150}
      />
    </div>
  );
}

export { ImagePreview };
