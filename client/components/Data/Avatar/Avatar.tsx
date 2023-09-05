import * as AvatarBase from '@radix-ui/react-avatar';
import { twMerge } from 'tailwind-merge';

export interface IAvatar {
  src?: string;
  alt?: string;
  fallback?: string;
  className?: string;
}

//TODO: Use NextJS Image
const Avatar: React.FC<IAvatar> = ({ src, alt, fallback, className }) => {
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
        className="flex h-full w-full items-center justify-center bg-white text-[15px] font-medium text-black"
        delayMs={600}
      >
        {fallback}
      </AvatarBase.Fallback>
    </AvatarBase.Root>
  );
};

export default Avatar;
