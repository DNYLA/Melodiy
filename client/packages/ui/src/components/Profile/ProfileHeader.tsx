import { getDefaultUserImage } from '../../utils';
import { Image } from '../Data/Image';
import { Button } from '../Inputs';
import { Share2Icon } from '@radix-ui/react-icons';

export interface ProfileHeaderProps {
  id: number;
  username: string | React.ReactNode;
  avatar?: string;
  followers: number;
  following: number;
}

function ProfileHeader({
  username,
  avatar,
  followers,
  following,
}: ProfileHeaderProps) {
  return (
    <div className="relative flex items-center w-full p-4 rounded-md ronded-lg border-base bg-accent h-96">
      <div className="flex items-center w-full h-38 gap-x-2">
        <Image
          draggable={false}
          src={avatar}
          fallback={getDefaultUserImage()}
          width={150}
          height={150}
          className="rounded-full"
        />

        <div className="flex flex-col justify-between h-full p-5 text-">
          <span className="text-xl font-semibold">{username}</span>
          <div className="flex gap-x-5">
            <p className="font-light ">
              {followers.toLocaleString()}{' '}
              <span className="italic text-base-accent">followers</span>
            </p>
            <p>
              {following.toLocaleString()}{' '}
              <span className="italic text-base-accent">following</span>
            </p>
          </div>

          <p>
            {following.toLocaleString()}{' '}
            <span className="italic text-base-accent">public playlists</span>
          </p>
        </div>
      </div>

      <div className="flex items-center pr-1 mt-20 gap-x-4 animate-fade">
        <Button
          variant={'alternative'}
          className="w-24 font-medium bg-base-accent/100 text-content hover:bg-opacity/100 hover:opacity-90"
        >
          Follow
        </Button>
        <Share2Icon
          width={30}
          height={30}
          className="duration-200 ease-in-out cursor-pointer text-content hover:text-base-accent"
        />
      </div>
    </div>
  );
}

export { ProfileHeader };
