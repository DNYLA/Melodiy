import * as HoverCard from '@radix-ui/react-hover-card';

import { signOut } from 'next-auth/react';
import Image from 'next/image';
function UserMenu() {
  return (
    <HoverCard.Root openDelay={200}>
      <HoverCard.Trigger asChild className="cursor-pointer">
        <Image
          className="block h-[45px] w-[45px] rounded-full"
          src={'/images/test-avatar.jpg'}
          priority={false}
          alt="Avatar"
          width={45}
          height={45}
        />
        {/* <Avatar src={'./images/test-avatar.jpg'} fallback="J" className="" /> */}
      </HoverCard.Trigger>
      <HoverCard.Portal>
        <HoverCard.Content
          className="data-[side=bottom]:animate-slideUpAndFade data-[side=right]:animate-slideLeftAndFade data-[side=left]:animate-slideRightAndFade data-[side=top]:animate-slideDownAndFade w-[150px] rounded-md bg-white p-5 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] data-[state=open]:transition-all"
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

export default UserMenu;
