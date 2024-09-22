import { ButtonHTMLAttributes, forwardRef } from 'react';
import { FaSpinner } from 'react-icons/fa';
import { twMerge } from 'tailwind-merge';
import { Button, ButtonProps } from './Button';

interface ActionButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    ButtonProps {
  isLoading: boolean;
}

const ActionButton = forwardRef<HTMLButtonElement, ActionButtonProps>(
  (
    {
      className,
      isLoading,
      variant = 'alternative',
      rounded = 'action',
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <Button
        className={twMerge('gap-x-2', className)}
        disabled={isLoading}
        ref={ref}
        variant={variant}
        rounded={rounded}
        {...props}
      >
        {isLoading && <FaSpinner className="animate-spin" />}
        {children}
      </Button>
    );
  },
);

ActionButton.displayName = 'ActionButton';

export { ActionButton };
