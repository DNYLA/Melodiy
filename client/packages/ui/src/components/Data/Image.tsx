import { ImgHTMLAttributes, SyntheticEvent, forwardRef } from 'react';
import { getDefaultImage } from '../../utils';

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  fallback?: string;
}

//Wrapper around image to handle fallbacks by default
const Image = forwardRef<HTMLImageElement, ImageProps>(
  ({ src, fallback, alt, style, ...props }, ref) => {
    const handleError = (e: SyntheticEvent<HTMLImageElement, Event>) => {
      const fallbackSrc = fallback ?? getDefaultImage();
      e.currentTarget.src = fallbackSrc;
    };

    return (
      <div ref={ref}>
        <img
          // style={{ objectFit: 'cover' }}
          src={src ?? getDefaultImage()}
          alt={alt}
          onError={handleError}
          {...props}
        />
      </div>
    );
  },
);

Image.displayName = 'MelodiyImage';

export { Image };
