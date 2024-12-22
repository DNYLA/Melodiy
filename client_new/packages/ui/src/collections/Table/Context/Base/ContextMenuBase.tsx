import * as ContextMenu from '@radix-ui/react-context-menu';
import { twMerge } from 'tailwind-merge';

type ContextMenuBaseProps = {
  children: React.ReactNode;
  className?: string;
} & React.PropsWithChildren<React.ComponentPropsWithoutRef<'div'>>;

function ContextMenuBase({
  children,
  className,
  ...props
}: ContextMenuBaseProps) {
  return (
    <ContextMenu.Content
      className={twMerge(
        'min-w-[220px] bg-modal p-3 overflow-hidden rounded-md text-content gap-y-1 flex flex-col',
        className,
      )}
      alignOffset={5}
      {...props}
      // align="end"
    >
      {children}
    </ContextMenu.Content>
  );
}

export default ContextMenuBase;
