import { IconProps } from '../types';
import { twMerge } from 'tailwind-merge';

function CheckIcon({ width = 50, height = 50, className }: Partial<IconProps>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    className={twMerge('text-base-accent stroke-current', className)}
    fill="none"
    viewBox="0 0 41 42" >
      <circle cx="21.005" cy="20.496" r="11" fill="stroke-current"></circle><path stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m16.757 20.996 3 3 5.5-5.5"></path>
    </svg>
  );
}

export { CheckIcon };
