import { IconProps } from '../types';
import { twMerge } from 'tailwind-merge';

function NextIcon({ width = 50, height = 50, className }: Partial<IconProps>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    className={twMerge('text-base-accent stroke-current', className)}
    fill="none"
    viewBox="0 0 41 42" >
      <path stroke="stroke-current" stroke-linecap="round" stroke-width="2.526" d="M25.927 15.828v10.103"></path><path fill="stroke-current" d="M23.919 19.591a1.53 1.53 0 0 1 0 2.577l-7 4.49a1.53 1.53 0 0 1-2.357-1.288v-8.98c0-1.211 1.338-1.943 2.357-1.289l7 4.49Z"></path>
    </svg>
  );
}

export { NextIcon };
