import { IconProps } from '../types';
import { twMerge } from 'tailwind-merge';

function DiscoverIcon({ width = 50, height = 50, className }: Partial<IconProps>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    className={twMerge('text-base-accent stroke-current', className)}
    fill="none"
    viewBox="0 0 41 42" >
      <path stroke="stroke-current" stroke-width="2" d="m20.508 9.196.504 1.794a13 13 0 0 0 9.002 9.002l1.794.504-1.794.504a13 13 0 0 0-9.002 9.002l-.504 1.794-.504-1.794A13 13 0 0 0 11.002 21l-1.794-.504 1.794-.504a13 13 0 0 0 9.002-9.002l.504-1.794Z"></path>
    </svg>
  );
}

export { DiscoverIcon };
