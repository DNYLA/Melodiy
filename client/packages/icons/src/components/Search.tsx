import { IconProps } from '../types';
import { twMerge } from 'tailwind-merge';

function SearchIcon({ width = 50, height = 50, className }: Partial<IconProps>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    className={twMerge('text-base-accent stroke-current', className)}
    fill="none"
    viewBox="0 0 41 42" >
      <path stroke="stroke-current" stroke-linecap="round" stroke-width="2.021" d="M25.654 25.03a8.696 8.696 0 1 0-12.42-12.174 8.696 8.696 0 0 0 12.42 12.175Zm0 0 5.095 5.218"></path>
    </svg>
  );
}

export { SearchIcon };
