import { IconProps } from '@melodiy/icons/types';
import React, { JSXElementConstructor } from 'react';
import { twMerge } from 'tailwind-merge';

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: JSXElementConstructor<IconProps>;
  width?: number;
  height?: number;
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      className,
      width = 50,
      height = 50,
      disabled,
      type = 'button',
      icon: Icon,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        className={twMerge(
          'p-0 transition-all ease-in delay-75 border-none rounded-full hover:opacity-85',
        )}
        type={type}
        data-type="button"
        disabled={disabled}
        ref={ref}
        {...props}
      >
        <Icon
          width={width}
          height={height}
          className={twMerge('p-1', className)}
        />
      </button>
    );
  },
);

IconButton.displayName = 'Button';

export { IconButton };
