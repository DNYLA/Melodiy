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
      console.log(fallbackSrc);
      e.currentTarget.src = fallback;
    };

    return (
      <div ref={ref}>
        <NextImage src={src} onError={handleError} {...props} />
      </div>
    );
  }
);

// const Image: FC<ImageProps> = ({ src, fallbackSrc, ...props }) => {
//   const handleError = (e: SyntheticEvent<HTMLImageElement, Event>) => {
//     const fallback = fallbackSrc ?? 'images/default_playlist.png';
//     console.log(fallbackSrc);
//     e.currentTarget.src = fallback;
//   };

//   return <NextImage src={src} onError={handleError} {...props} />;
// };

export default Image;
