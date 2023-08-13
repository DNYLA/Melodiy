import React from 'react';
import * as HoverCard from '@radix-ui/react-hover-card';
import Image from 'next/image';
import Avatar from '@/components/avatar';
import * as Menubar from '@radix-ui/react-menubar';
import {
  CheckIcon,
  ChevronRightIcon,
  DotFilledIcon,
} from '@radix-ui/react-icons';
import { signOut } from 'next-auth/react';
function UserSettings() {
  return (
    <HoverCard.Root openDelay={200}>
      <HoverCard.Trigger asChild className="cursor-pointer">
        <img
          className="block h-[45px] w-[45px] rounded-full"
          src="./images/test-avatar.jpg"
          alt="Radix UI"
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

export default UserSettings;
