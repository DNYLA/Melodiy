import { IconProps } from '../types';
import { twMerge } from 'tailwind-merge';

function FilterIcon({ width = 50, height = 50, className }: Partial<IconProps>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    className={twMerge('text-base-accent stroke-current', className)}
    fill="none"
    viewBox="0 0 41 42" >
      <path stroke="stroke-current" stroke-linecap="round" stroke-width="2" d="M11.492 14.248h18m-14.492 6h10m-7 6h4"></path>
    </svg>
  );
}

export { FilterIcon };
