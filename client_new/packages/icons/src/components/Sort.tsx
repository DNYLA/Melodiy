import { IconProps } from '../types';
import { twMerge } from 'tailwind-merge';

function SortIcon({ width = 50, height = 50, className }: Partial<IconProps>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    className={twMerge('text-base-accent stroke-current', className)}
    fill="none"
    viewBox="0 0 41 42" >
      <path stroke="stroke-current" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.021" d="M27.643 26.973V13.697m0 0L23 18.34m4.643-4.643 4.643 4.643m-17.643-4.367v13.276m0 0 4.643-4.643m-4.643 4.643L10 22.606"></path>
    </svg>
  );
}

export { SortIcon };
