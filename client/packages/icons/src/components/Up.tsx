import { IconProps } from '../types';
import { twMerge } from 'tailwind-merge';

function UpIcon({ width = 50, height = 50, className }: Partial<IconProps>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    className={twMerge('text-base-accent stroke-current', className)}
    fill="none"
    viewBox="0 0 41 42" >
      <path stroke="stroke-current" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.357" d="m26.17 22.565-5.051-5.051-5.052 5.051"></path>
    </svg>
  );
}

export { UpIcon };
