import NextImage, { ImageProps as NextImageProps } from 'next/image';
import React, { ForwardedRef, SyntheticEvent } from 'react';

export interface ImageProps extends NextImageProps {
  fallbackSrc?: string;
}

//Wrapper around nextimage to handle fallbacks by default
const Image = React.forwardRef<HTMLDivElement, ImageProps>(
  ({ src, fallbackSrc, ...props }, ref: ForwardedRef<HTMLDivElement>) => {
    const handleError = (e: SyntheticEvent<HTMLImageElement, Event>) => {
      const fallback = fallbackSrc ?? 'images/default_playlist.png';
      e.currentTarget.src = fallback;
    };

    return (
      <div ref={ref}>
        <NextImage
          style={{ objectFit: 'cover' }}
          src={src ?? 'images/default_playlist.png'}
          onError={handleError}
          {...props}
        />
      </div>
    );
  }
);

export default Image;
