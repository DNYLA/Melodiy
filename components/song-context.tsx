import React from 'react';
import * as ContextMenu from '@radix-ui/react-context-menu';
import {
  DotFilledIcon,
  CheckIcon,
  ChevronRightIcon,
} from '@radix-ui/react-icons';
import usePlayer from '@/hooks/usePlayer';

interface SongContextProps {
  trackId: string;
  children: React.ReactNode;
}

const SongContextMenu = ({ children, trackId }: SongContextProps) => {
  const [bookmarksChecked, setBookmarksChecked] = React.useState(true);
  const [urlsChecked, setUrlsChecked] = React.useState(false);
  const [person, setPerson] = React.useState('pedro');

  const player = usePlayer();

  const onQueue = (id: string) => {
    console.log(player.activeId);
    const curIds = player.ids;

    curIds.splice(1, 0, id);

    console.log(curIds);
  };

  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger asChild>{children}</ContextMenu.Trigger>
      <ContextMenu.Portal>
        <ContextMenu.Content
          className="min-w-[220px] bg-[#1b1818] text-white rounded-md overflow-hidden p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]"
          alignOffset={5}
          // align="end"
        >
          <ContextMenu.Sub>
            <ContextMenu.SubTrigger className="group text-sm leading-none rounded-[3px] flex items-center h-[25px] relative px-2 py-4 outline-none data-[state=open]:bg-neutral-700/80 data-[highlighted]:bg-neutral-700/80">
              Add to playlist
              <div className="ml-auto pl-5 group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8">
                <ChevronRightIcon />
              </div>
            </ContextMenu.SubTrigger>
            <ContextMenu.Portal>
              <ContextMenu.SubContent
                className="min-w-[220px] bg-white rounded-md overflow-hidden p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]"
                sideOffset={2}
                alignOffset={-5}
              >
                <ContextMenu.Item className="group text-[13px] leading-none rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1">
                  Save Page As…{' '}
                  <div className="ml-auto pl-5 text-mauve11 group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8">
                    ⌘+S
                  </div>
                </ContextMenu.Item>
                <ContextMenu.Item className="text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1">
                  Create Shortcut…
                </ContextMenu.Item>
                <ContextMenu.Item className="text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1">
                  Name Window…
                </ContextMenu.Item>
                <ContextMenu.Separator className="h-[1px] bg-violet6 m-[5px]" />
                <ContextMenu.Item className="text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1">
                  Developer Tools
                </ContextMenu.Item>
              </ContextMenu.SubContent>
            </ContextMenu.Portal>
          </ContextMenu.Sub>

          <ContextMenu.Item
            onClick={() => onQueue(trackId)}
            className="group text-sm leading-none rounded-[3px] flex items-center h-[25px] relative px-2 py-4 outline-none  data-[highlighted]:bg-neutral-700/80"
          >
            Add to queue
          </ContextMenu.Item>
          <ContextMenu.Item className="group text-sm leading-none rounded-[3px] flex items-center h-[25px] relative px-2 py-4 outline-none  data-[highlighted]:bg-neutral-700/80">
            Add to Liked Songs
          </ContextMenu.Item>

          <ContextMenu.Separator className="h-[1px] bg-neutral-700 m-[5px]" />
          <ContextMenu.Item className="group text-sm leading-none rounded-[3px] flex items-center h-[25px] relative px-2 py-4 outline-none  data-[highlighted]:bg-neutral-700/80">
            View artist
          </ContextMenu.Item>
          <ContextMenu.Item className="group text-sm leading-none rounded-[3px] flex items-center h-[25px] relative px-2 py-4 outline-none  data-[highlighted]:bg-neutral-700/80">
            View album
          </ContextMenu.Item>
        </ContextMenu.Content>
      </ContextMenu.Portal>
    </ContextMenu.Root>
  );
};

export default SongContextMenu;
