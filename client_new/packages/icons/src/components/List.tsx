import { IconProps } from '../types';
import { twMerge } from 'tailwind-merge';

function ListIcon({ width = 50, height = 50, className }: Partial<IconProps>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    className={twMerge('text-base-accent stroke-current', className)}
    fill="none"
    viewBox="0 0 41 42" >
      <path stroke="stroke-current" stroke-linecap="round" stroke-width="2" d="M17.497 14.248h12m-17.583 0h1m4.583 6h12m-17.583 0h1m4.583 6h12m-17.583 0h1"></path>
    </svg>
  );
}

export { ListIcon };
