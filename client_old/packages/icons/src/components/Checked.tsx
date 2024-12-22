import { IconProps } from '../types';
import { twMerge } from 'tailwind-merge';

function CheckedIcon({ width = 50, height = 50, className }: Partial<IconProps>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    className={twMerge('text-base-accent stroke-current', className)}
    fill="none"
    viewBox="0 0 41 42" >
      <path stroke="stroke-current" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.02" d="m14 19.731 5.38 5.38 9.863-9.863"></path>
    </svg>
  );
}

export { CheckedIcon };
