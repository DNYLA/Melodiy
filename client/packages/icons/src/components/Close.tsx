import { IconProps } from '../types';
import { twMerge } from 'tailwind-merge';

function CloseIcon({ width = 50, height = 50, className }: Partial<IconProps>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    className={twMerge('text-base-accent stroke-current', className)}
    fill="none"
    viewBox="0 0 41 42" >
      <path stroke="stroke-current" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.021" d="m25.43 16.078-5.052 5.052m-5.05 5.05 5.05-5.05m0 0-5.05-5.052m5.05 5.052 5.052 5.05"></path>
    </svg>
  );
}

export { CloseIcon };
