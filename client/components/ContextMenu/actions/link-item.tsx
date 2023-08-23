import React from 'react';
import * as ContextMenu from '@radix-ui/react-context-menu';
import { useRouter } from 'next/navigation';

interface LinkContextProps {
  path: string;
  disabled?: boolean;
  children: React.ReactNode;
}

export default function LinkContextItem({
  path,
  disabled,
  children,
}: LinkContextProps) {
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
        'group text-sm leading-none rounded-[3px] flex items-center h-[25px] relative px-2 py-4 outline-none  data-[highlighted]:bg-neutral-700/80 data-[disabled]:text-inactive'
      }
    >
      {children}
    </ContextMenu.Item>
  );
}
