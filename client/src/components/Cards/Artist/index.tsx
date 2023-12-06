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
      className="flex h-[220px] w-[220px] cursor-pointer flex-col items-center justify-center gap-y-1"
      onClick={handleRedirect}
    >
      <Image
        draggable={false}
        className={'max-h-[180px] max-w-[180px] rounded-full'}
        priority={true}
        src={imageUrl}
        width={180}
        height={180}
        alt="Artist Avatar"
        quality={100}
      />
      <p className="truncate text-center font-bold hover:underline">{name}</p>
    </div>
  );
};

export default ArtistCard;
