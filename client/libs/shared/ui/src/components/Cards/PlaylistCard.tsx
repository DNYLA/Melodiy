import { User } from '@melodiy/types';
import { Link } from '@tanstack/react-router';
import { Image } from '../Data';

export enum PlaylistCardSize {
  Small = 150,
  Medium = 180,
  Large = 200,
}

export interface PlaylistCardProps {
  id: string;
  title: string;
  owner?: User;
  imageSrc?: string;
  size?: PlaylistCardSize;
}

function PlaylistCard({
  id,
  title,
  owner,
  imageSrc,
  size = PlaylistCardSize.Medium,
}: PlaylistCardProps) {
  return (
    <Link to={'/playlist/$id'} params={{ id }}>
      <div
        className="flex flex-col duration-300 ease-in-out cursor-pointer group gap-y-1 hover:scale-110"
        style={{ minWidth: size }}
      >
        <Image
          draggable={false}
          className={'rounded-md'}
          style={{ minHeight: size, maxHeight: size }}
          src={imageSrc}
          width={size}
          height={size}
          alt="Artist Picture"
        />
        <div className="flex flex-col gap-0 p-0 m-0" style={{ maxWidth: size }}>
          <p className="max-w-[200px] truncate font-bold hover:underline">
            {title}
          </p>
          {owner && (
            <Link to={'/user/$id'} params={{ id: owner.id }}>
              <span
                key={owner.id}
                className="m-0 truncate p-0 text-sm font-light text-[#969696] hover:underline"
              >
                {owner.username}
              </span>
            </Link>
          )}
        </div>
      </div>
    </Link>
  );
}

export { PlaylistCard };
