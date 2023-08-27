import * as ContextMenu from '@radix-ui/react-context-menu';

export default function LikeSongContextItem() {
  return (
    <ContextMenu.Item
      disabled
      className={
        'group text-sm leading-none rounded-[3px] flex items-center h-[25px] relative px-2 py-4 outline-none  data-[highlighted]:bg-neutral-700/80 data-[disabled]:text-inactive'
      }
    >
      Add to Liked Songs
    </ContextMenu.Item>
  );
}
