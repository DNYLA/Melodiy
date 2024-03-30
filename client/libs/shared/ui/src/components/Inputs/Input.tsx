import { cn } from '../../utils';
import { cva, VariantProps } from 'class-variance-authority';
import { forwardRef, InputHTMLAttributes } from 'react';

export interface InputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {}

const inputVariants = cva(
  'w-full bg-neutral-700 text-sm leading-none items-center rounded justify-center placeholder:text-sm placeholder:font-extralight outline-none text-white placeholder:text-neutral-500 disabled:cursor-not-allowed disabled:bg-neutral-400',
  {
    variants: {
      variant: {
        default:
          'shadow-blackA9 h-[35px] inline-flex appearance-none rounded px-2.5 py-2 ',
        alternative: 'flex rounded-md border bg-white text-black px-2 py-1.5',
        file: 'file:hover:opacity-[85%] flex w-full rounded-md border border-transparent px-2 py-1 file:mb-2 h-[35px] file:rounded-sm file:border-none file:bg-white file:p-1.5 file:text-black',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, type = 'text', ...props }, ref) => {
    return (
      <input
        className={cn(inputVariants({ variant, className }))}
        type={type}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

export { Input, inputVariants };
