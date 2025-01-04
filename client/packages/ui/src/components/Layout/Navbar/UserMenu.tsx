// import { SettingsIcon } from '@melodiy/icons';
// import { Link } from '@melodiy/router';
import { Link, useNavigate } from '@melodiy/router';
import { useSession } from '../../../hooks/useSession';
import { Image } from '../../Data/Image';
import { SettingsIcon } from '@melodiy/icons';
import { getDefaultUserImage } from '../../../utils';

export function UserMenu() {
  const { user } = useSession();
  const navgiate = useNavigate();

  if (!user) {
    navgiate({ to: '/' });
    return;
  }

  return (
    <div className="flex flex-row items-center gap-x-3">
      <Link to="/settings" className="group">
        <SettingsIcon
          width={40}
          height={40}
          className="group-hover:stroke-content group-[&.active]:stroke-content hover:"
        />
      </Link>

      <Link to="/profile/$id" params={{ id: user?.username }} className="group">
        <Image
          className="block h-[45px] w-[45px] rounded-full hover:border border-base"
          src={user?.avatar}
          fallback={getDefaultUserImage()}
          alt="Avatar"
          width={45}
          height={45}
        />
      </Link>
    </div>
  );
}
