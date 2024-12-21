import { IconProps } from '../types';
import { twMerge } from 'tailwind-merge';

function LeftIcon({ width = 50, height = 50, className }: Partial<IconProps>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    className={twMerge('text-base-accent stroke-current', className)}
    fill="none"
    viewBox="0 0 41 42" >
      <path stroke="stroke-current" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.357" d="m22.057 15.83-5.051 5.051 5.05 5.052"></path>
    </svg>
  );
}

export { LeftIcon };
