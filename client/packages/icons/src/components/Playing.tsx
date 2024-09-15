import { IconProps } from '../types';
import { twMerge } from 'tailwind-merge';

function PlayingIcon({ width = 50, height = 50, className }: Partial<IconProps>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    className={twMerge('text-base-accent stroke-current', className)}
    fill="none"
    viewBox="0 0 41 42" >
      <path stroke="stroke-current" stroke-linecap="round" stroke-width="2" d="M14.751 27.996v-5.5m6 5.5v-14.5m6 14.5v-9"></path>
    </svg>
  );
}

export { PlayingIcon };
