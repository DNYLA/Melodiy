import * as React from 'react';
import { twMerge } from 'tailwind-merge';

export interface IIconButton
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
}

const IconButton = React.forwardRef<HTMLButtonElement, IIconButton>(
  ({ className, children, disabled, type = 'button', icon, ...props }, ref) => {
    return (
      <button
        className={twMerge(
          'border-none p-0  transition-all delay-75 ease-in hover:opacity-70',
          className
        )}
        data-test="shuffle-all"
        type={type}
        data-type="button"
        data-track--button-id="shuffle"
        data-tracktype--button-id="string"
        data-tracktype--content-id="undefined"
        data-tracktype--content-type="undefined"
        data-tracktype--end-result="undefined"
        data-tracktype--target="undefined"
        disabled={disabled}
        ref={ref}
        {...props}
      >
        <div className="flex flex-col items-center justify-center w-full h-full">
          <div className="opacity-80">{icon}</div>
          <span
            data-wave-color="textDefault"
            className="mt-[9px] text-sm font-light"
          >
            {children}
          </span>
        </div>
      </button>
    );
  }
);

IconButton.displayName = 'Button';

export { IconButton };
