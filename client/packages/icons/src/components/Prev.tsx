import { IconProps } from '../types';
import { twMerge } from 'tailwind-merge';

function PrevIcon({ width = 50, height = 50, className }: Partial<IconProps>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    className={twMerge('text-base-accent stroke-current', className)}
    fill="none"
    viewBox="0 0 41 42" >
      <path stroke="stroke-current" stroke-linecap="round" stroke-width="2.526" d="M16.073 15.828v10.103"></path><path fill="stroke-current" d="M18.081 22.168a1.53 1.53 0 0 1 0-2.576l7-4.49c1.019-.655 2.358.077 2.358 1.288v8.98c0 1.21-1.339 1.942-2.358 1.289l-7-4.49Z"></path>
    </svg>
  );
}

export { PrevIcon };
