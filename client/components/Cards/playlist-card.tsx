'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface PlaylistCardProps {
  uid: string;
  title: string;
  owner: string;
  imageUrl: string;
}

export default function PlaylistCard({
  uid,
  title,
  owner,
  imageUrl,
}: PlaylistCardProps) {
  const router = useRouter();

  const handleRedirect = () => {
    router.push(`/playlist/${uid}`);
  };

  return (
    <div
      onClick={handleRedirect}
      className="group min-w-[200px]  cursor-pointer duration-300 ease-in-out hover:scale-110"
    >
      <Image
        className="rounded-lg"
        src={imageUrl}
        width={200}
        height={200}
        alt="Playlist Cover"
      />
      <div className="mt-1">
        <p className="cursor-pointer truncate text-lg font-bold hover:underline ">
          {title}
        </p>
        <p className="text-sm text-inactive hover:underline">{owner}</p>
      </div>
    </div>
  );
}
