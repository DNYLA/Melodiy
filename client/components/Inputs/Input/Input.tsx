import React, { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

export interface IInput extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, IInput>(
  ({ className, type, disabled, ...props }, ref) => {
    return (
      <input
        type={type}
        className={twMerge(
          `flex w-full rounded-md border border-transparent bg-white px-2 py-1 text-sm text-black placeholder:text-inactive focus:outline-none`,
          className
        )}
        disabled={disabled}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';
export default Input;
