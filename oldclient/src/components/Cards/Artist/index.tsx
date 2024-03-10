'use client';

import Image from '@/components/Data/Image';
import { useRouter } from 'next/navigation';

export interface IArtistCard {
  name: string;
  imageUrl: string;
  redirect?: string;
}

const ArtistCard: React.FC<IArtistCard> = ({ name, imageUrl, redirect }) => {
  const router = useRouter();

  const handleRedirect = () => {
    if (!redirect) return;

    router.push(redirect);
  };

  return (
    <div
      className="flex h-[200px] w-[160px] cursor-pointer flex-col items-center justify-center gap-y-1"
      onClick={handleRedirect}
    >
      <Image
        draggable={false}
        className={'max-h-[160px] max-w-[160px] rounded-full'}
        priority={true}
        src={imageUrl}
        width={160}
        height={160}
        alt="Artist Avatar"
        quality={100}
      />
      <p className="truncate text-center font-bold hover:underline">{name}</p>
    </div>
  );
};

export default ArtistCard;
