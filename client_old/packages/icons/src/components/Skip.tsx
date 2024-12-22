import { IconProps } from '../types';
import { twMerge } from 'tailwind-merge';

function SkipIcon({ width = 50, height = 50, className }: Partial<IconProps>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    className={twMerge('text-base-accent stroke-current', className)}
    fill="none"
    viewBox="0 0 41 42" >
      <path fill="stroke-current" d="M20.897 19.379a1.53 1.53 0 0 1 0 2.576l-7 4.49a1.53 1.53 0 0 1-2.357-1.288v-8.98c0-1.21 1.338-1.942 2.357-1.289l7 4.49Z"></path><path fill="stroke-current" d="M30.897 19.379a1.53 1.53 0 0 1 0 2.576l-7 4.49a1.53 1.53 0 0 1-2.357-1.288v-8.98c0-1.21 1.338-1.942 2.357-1.289l7 4.49Z"></path>
    </svg>
  );
}

export { SkipIcon };
