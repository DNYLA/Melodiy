import * as ContextMenu from '@radix-ui/react-context-menu';
import { Link } from '@tanstack/react-router';
import React from 'react';

interface LinkContextItemProps {
  path: string;
  slug?: string;
  disabled?: boolean;
  children: React.ReactNode;
}

function LinkContextItem({
  path,
  slug,
  disabled,
  children,
}: LinkContextItemProps) {
  return (
    <Link to={`/${path}/$id`} params={{ id: slug }} disabled={disabled}>
      <ContextMenu.Item
        disabled={disabled}
        className={
          'group relative flex h-[25px] items-center rounded-[3px] px-2 py-4 text-sm leading-none outline-none  data-[highlighted]:bg-neutral-700/80 data-[disabled]:text-inactive'
        }
      >
        {children}
      </ContextMenu.Item>
    </Link>
  );
}

export default LinkContextItem;
