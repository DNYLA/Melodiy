import * as React from 'react';
import { twMerge } from 'tailwind-merge';

export interface IButton
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const IconButton = React.forwardRef<HTMLButtonElement, IButton>(
  ({ className, children, disabled, type = 'button', ...props }, ref) => {
    return (
      <button
        type={type}
        className={twMerge(
          'w-full rounded-sm border border-transparent bg-white px-3 py-3 font-bold text-black transition hover:opacity-75 disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        disabled={disabled}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);
IconButton.displayName = 'Button';

export default IconButton;
