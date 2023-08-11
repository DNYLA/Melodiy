import * as AvatarBase from '@radix-ui/react-avatar';
import React from 'react';
import { twMerge } from 'tailwind-merge';

interface AvatarProps {
  src?: string;
  alt?: string;
  fallback?: string;
  className?: string;
}

function Avatar({ src, alt, fallback, className }: AvatarProps) {
  return (
    <AvatarBase.Root
      className={twMerge(
        'bg-blackA3 inline-flex h-[45px] w-[45px] select-none items-center justify-center overflow-hidden rounded-full align-middle',
        className
      )}
    >
      <AvatarBase.Image
        className="h-full w-full rounded-[inherit] object-cover"
        src={src}
        alt={alt}
      />
      <AvatarBase.Fallback
        className="text-black flex h-full w-full items-center justify-center bg-white text-[15px] font-medium"
        delayMs={600}
      >
        {fallback}
      </AvatarBase.Fallback>
    </AvatarBase.Root>
  );
}

export default Avatar;
