import { Button } from './Button';
import { ButtonHTMLAttributes, forwardRef } from 'react';
import { FaSpinner } from 'react-icons/fa';
import { twMerge } from 'tailwind-merge';

interface ActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading: boolean;
}

const ActionButton = forwardRef<HTMLButtonElement, ActionButtonProps>(
  ({ className, isLoading, children, ...props }, ref) => {
    return (
      <Button
        className={twMerge('gap-x-2', className)}
        disabled={isLoading}
        ref={ref}
        {...props}
      >
        {isLoading && <FaSpinner className="animate-spin" />}
        {children}
      </Button>
    );
  }
);

ActionButton.displayName = 'ActionButton';

export { ActionButton };
