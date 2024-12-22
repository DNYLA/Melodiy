// import { SettingsIcon } from '@melodiy/icons';
// import { Link } from '@melodiy/router';
import { useSession } from '../../../hooks/useSession';
import { Image } from '../../Data/Image';

export function UserMenu() {
  const { user } = useSession();
  const defaultAvatar = '/images/default_avatar.jpg';

  return (
    <div className="flex flex-row items-center gap-x-3">
      {/* <Link to="/settings" className="group">
        <SettingsIcon
          width={40}
          height={40}
          className="group-hover:stroke-content group-[&.active]:stroke-content hover:"
        />
      </Link> */}

      <Image
        className="block h-[45px] w-[45px] rounded-full hover:border border-base"
        src={user?.avatar ?? defaultAvatar}
        fallback={defaultAvatar}
        alt="Avatar"
        width={45}
        height={45}
      />
    </div>
  );
}