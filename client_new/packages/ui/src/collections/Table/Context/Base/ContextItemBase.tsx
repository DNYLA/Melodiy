import { IconProps } from '@melodiy/icons/types';
import * as ContextMenu from '@radix-ui/react-context-menu';
import { twMerge } from 'tailwind-merge';

type ContextItemBaseProps = {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  icon?: React.ComponentType<IconProps>;
};

function ContextItemBase({
  children,
  className,
  disabled = false,
  onClick,
  icon: Icon,
}: ContextItemBaseProps) {
  return (
    <ContextMenu.Item
      disabled={disabled}
      onClick={onClick}
      className={twMerge(
        'group relative flex h-9 items-center rounded-[3px] py-5 text-sm leading-none outline-none data-[highlighted]:bg-neutral-700/80 data-[disabled]:text-inactive',
        className,
      )}
    >
      {Icon && (
        <Icon
          width={45}
          height={45}
          className="group-hover:stroke-content group-[&.active]:stroke-content p-1"
        />
      )}
      {children}
    </ContextMenu.Item>
  );
}

export default ContextItemBase;
