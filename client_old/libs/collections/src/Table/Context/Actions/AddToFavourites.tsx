import * as ContextMenu from '@radix-ui/react-context-menu';

// interface AddToFavouritesProps {}

export function AddToFavouritesContextItem() {
  return (
    <ContextMenu.Item
      disabled
      className={
        'group relative flex h-[25px] items-center rounded-[3px] px-2 py-4 text-sm leading-none outline-none  data-[highlighted]:bg-neutral-700/80 data-[disabled]:text-inactive'
      }
    >
      Add to Liked Songs
    </ContextMenu.Item>
  );
}

export default AddToFavouritesContextItem;
