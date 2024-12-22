import { cva, VariantProps } from 'class-variance-authority';
import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '../../../utils';

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const buttonVariants = cva(
  'w-full  border transition border-transparent hover:opacity-75 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'shadow-blackA7 hover:opacity-[93%] box-border inline-flex h-[35px] w-full items-center justify-center rounded-[4px] bg-white font-medium leading-none text-black shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none disabled:cursor-not-allowed disabled:bg-neutral-400',
        unstyled: 'bg-transparent font-medium text-white',
        alternative:
          'bg-primary font-medium text-black flex items-center justify-center',
      },
      size: {
        default: 'px-3 py-2',
        lg: 'px-6 py-2',
      },
      rounded: {
        default: 'rounded-full',
        action: 'rounded-[10px]',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      rounded: 'default',
    },
  },
);

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, size, variant, rounded, type = 'button', ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, rounded, className }))}
        type={type}
        ref={ref}
        {...props}
      />
    );
  },
);

Button.displayName = 'Button';

export { Button, buttonVariants };
