import { User } from '@melodiy/types';
import { Link } from '@melodiy/router';
import { Image } from '../Data/Image';
import { CollectionCardSize } from './CollectionCard';

export interface PlaylistCardProps {
  id: string;
  title: string;
  owner: User;
  imageSrc?: string;
  size?: CollectionCardSize;
}

function PlaylistCard({
  id,
  title,
  owner,
  imageSrc,
  size = CollectionCardSize.Medium,
}: PlaylistCardProps) {
  return (
    <Link to={'/playlist/$id'} params={{ id }}>
      <div className="flex flex-col duration-300 ease-in-out cursor-pointer group gap-y-1 hover:scale-110">
        <Image
          draggable={false}
          className={'flex rounded-md object-cover w-full h-full'}
          src={imageSrc}
          width={size}
          height={size}
          alt={`${title} playlist cover`}
        />
        <div className="flex flex-col gap-0 p-0 m-0" style={{ maxWidth: size }}>
          <p className="max-w-[180px] truncate font-bold hover:underline">
            {title}
          </p>

          <div className="flex truncate gap-x-1">
            <Link
              to={'/profile/$id'}
              params={{ id: owner.username }}
              key={`${id}-${owner.id}`}
            >
              <span className="m-0 p-0 text-sm font-light text-[#969696] hover:underline">
                {owner.username}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </Link>
  );
}

export { PlaylistCard };
