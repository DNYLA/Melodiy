import { cn } from '@/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';
import { forwardRef, InputHTMLAttributes } from 'react';

export interface InputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {}

const inputVariants = cva(
  'text-sm leading-none items-center justify-center placeholder:text-sm placeholder:font-extralight outline-none placeholder:text-neutral-500 disabled:cursor-not-allowed disabled:bg-neutral-400',
  {
    variants: {
      variant: {
        default:
          'shadow-blackA9 h-[35px] inline-flex appearance-none rounded bg-neutral-700 px-2.5 py-2 text-white',
        alternative: 'flex rounded-md border bg-white text-black px-2 py-1.5',
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
