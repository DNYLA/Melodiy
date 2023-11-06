import { cn } from '@/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';
import { ButtonHTMLAttributes, forwardRef } from 'react';

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const buttonVariants = cva(
  'w-full rounded-full border border-transparent hover:opacity-75 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-transparent font-medium text-white transition',
        alternative: 'bg-primary font-bold text-black transition',
      },
      size: {
        default: 'h-full px-3 py-3',
        lg: 'h-full px-6 py-2',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, size, variant, type = 'button', ...props }) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        type={type}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
