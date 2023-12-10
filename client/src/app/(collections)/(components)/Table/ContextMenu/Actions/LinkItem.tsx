import * as ContextMenu from '@radix-ui/react-context-menu';
import { useRouter } from 'next/navigation';
import React from 'react';

interface ILinkContextItem {
  path: string;
  disabled?: boolean;
  children: React.ReactNode;
}

const LinkContextItem: React.FC<ILinkContextItem> = ({
  path,
  disabled,
  children,
}) => {
  const router = useRouter();

  const handleClick = () => {
    if (disabled) return;
    router.push(path);
  };

  return (
    <ContextMenu.Item
      disabled={disabled}
      onClick={handleClick}
      className={
        'group relative flex h-[25px] items-center rounded-[3px] px-2 py-4 text-sm leading-none outline-none  data-[highlighted]:bg-neutral-700/80 data-[disabled]:text-inactive'
      }
    >
      {children}
    </ContextMenu.Item>
  );
};

export default LinkContextItem;
