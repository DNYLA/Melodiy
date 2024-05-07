import * as HoverCard from '@radix-ui/react-hover-card';
import { Image } from '../../../components/Data';
import { useSession } from '../../../hooks/useSession';

export function UserMenu() {
  const { user, signOut } = useSession();
  const defaultAvatar = '/images/default_avatar.jpg';

  return (
    <HoverCard.Root openDelay={200}>
      <HoverCard.Trigger asChild className="cursor-pointer">
        <Image
          className="block h-[45px] w-[45px] rounded-full"
          src={user?.avatar ?? defaultAvatar}
          fallback={defaultAvatar}
          alt="Avatar"
          width={45}
          height={45}
        />
      </HoverCard.Trigger>

      <HoverCard.Portal>
        <HoverCard.Content
          className="data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade data-[side=right]:animate-slideLeftAndFade data-[side=top]:animate-slideDownAndFade w-[150px] rounded-md bg-white p-5 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] data-[state=open]:transition-all"
          sideOffset={5}
        >
          <div className="flex flex-col gap-[7px] text-black">
            <div className="flex flex-col gap-[15px]">
              <div>
                <span
                  className="cursor-pointer hover:text-neutral-600"
                  onClick={() => signOut()}
                >
                  Sign Out
                </span>
              </div>
            </div>
          </div>

          <HoverCard.Arrow className="fill-white" />
        </HoverCard.Content>
      </HoverCard.Portal>
    </HoverCard.Root>
  );
}
